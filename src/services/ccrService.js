import axios from "axios";
import * as cheerio from "cheerio";

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
      return "⚠️ Não encontrei informações da Ponte do Guaíba no site da ViaSul.";
    }

    // Each timecard represents an event (upcoming, ongoing, or finished)
    const timeCards = bridgeCard.find(".cmp-timecard");

    if (!timeCards.length) {
      return "ℹ️ Nenhum içamento programado ou em andamento foi encontrado.";
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
        message = `✅ Içamento finalizado às ${time}.`;
      } else if (/em andamento|andamento/i.test(normalizedStatus)) {
        message = `🚧 Içamento em andamento (iniciado às ${time}).`;
      } else if (/previsto|programado/i.test(normalizedStatus)) {
        message = `📅 Içamento programado para ${time}.`;
      } else {
        message = `ℹ️ Status: ${status} — horário ${time}.`;
      }

      events.push(message);
    });

    // Compose response
    return events.length
      ? events.join("\n")
      : "ℹ️ Nenhum evento de içamento encontrado no momento.";

  } catch (error) {
    console.error("Erro ao buscar status da ponte:", error.message);
    return "❌ Não foi possível obter o status da Ponte do Guaíba agora. Tente novamente mais tarde.";
  }
}
