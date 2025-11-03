import test from "node:test";
import assert from "node:assert/strict";
import { getPonteStatus } from "../src/services/ccrService.js";
import * as ponteService from "../src/services/ccrService.js";
import axios from "axios";

test("getPonteStatus parses valid HTML correctly", async () => {
  const mockHTML = `
    <div id="bridge-hoisting-card">
      <div class="cmp-timecard" data-cmp-horario="09h30">
        <span class="ChipStatusComponent" data-cmp-text="Finalizado"></span>
      </div>
    </div>
  `;

  // Backup original axios.get
  const originalGet = axios.get;

  // Mock axios.get
  axios.get = async () => ({ data: mockHTML });

  const result = await getPonteStatus();
  assert.match(result, /09h30/);
  assert.match(result, /finalizado/);

  // Restore axios.get
  axios.get = originalGet;
});

test("getPonteStatus handles missing bridge gracefully", async () => {
  axios.get = async () => ({ data: "<html></html>" });

  const result = await getPonteStatus();
  assert.match(result, /não encontrei|não foi possível/i);
});

test("getPonteStatus handles network errors", async () => {
  axios.get = async () => {
    throw new Error("Network Error");
  };

  const result = await getPonteStatus();
  assert.match(result, /Não foi possível obter o status/i);
});
