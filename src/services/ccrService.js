import axios from "axios";
import * as cheerio from "cheerio";
import { t } from "../utils/i18n.js";

const PONTE_URL = "https://rodovias.motiva.com.br/viasul/";

export async function getPonteStatus() {
  try {
    const { data } = await axios.get(PONTE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TelegramBot/1.0)"
      }
    });

    const $ = cheerio.load(data);

    // Find the bridge section by ID
    const bridgeCard = $("#bridge-hoisting-card");

    if (!bridgeCard.length) {
      return t(ctx, "bridge.not_found");
    }

    // Each timecard represents an event (upcoming, ongoing, or finished)
    const timeCards = bridgeCard.find(".cmp-timecard");

    if (!timeCards.length) {
      return t(ctx, "bridge.bridge_down");
    }

    const events = [];

    timeCards.each((_, el) => {
      const time = $(el).attr("data-cmp-horario") || $(el).find(".cmp-timecard__text").text().trim();
      const status = $(el).find(".ChipStatusComponent").attr("data-cmp-text") || "Desconhecido";
      const statusClass = $(el).attr("class") || "";

      // Simple normalization
      const normalizedStatus = status.toLowerCase();

      let message = "";
      if (/finalizado|encerrado/i.test(normalizedStatus)) {
        message = t(ctx, "bridge.bridge_completed", { time });
      } else if (/em andamento|andamento/i.test(normalizedStatus)) {
        message = t(ctx, "bridge.bridge_in_progress", { time });
      } else if (/previsto|programado/i.test(normalizedStatus)) {
        message = t(ctx, "bridge.bridge_scheduled", { time });
      } else {
        message = t(ctx, "bridge.not_found", { status, time });
      }

      events.push(message);
    });

    // Compose response
    return events.length
      ? events.join("\n")
      : t(ctx, "bridge.not_found");

  } catch (error) {
    console.error(t(ctx, "errors.updateStatus", { error: error.message }));
    return t(ctx, "errors.updateStatus", { error: error.message });
  }
}
