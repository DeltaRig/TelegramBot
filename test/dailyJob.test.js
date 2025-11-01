import test, { mock } from "node:test";
import assert from "node:assert/strict";

// Import modules
import * as cron from "node-cron";
import * as subsService from "../src/services/subscriptionService.js";
import * as ponteService from "../src/services/ponteService.js";
import { scheduleDailyJob } from "../src/scheduler/dailyJob.js";
const mock = []

test("scheduler sends Ponte update to all subscribers", async () => {
  // Mock the dependencies
  mock.method(cron, "schedule", (expression, fn) => {
    assert.equal(expression, "0 8 * * *", "Cron expression should match 8am daily");
    // Return a fake task object with trigger capability
    return { trigger: fn };
  });

  mock.method(subsService, "getSubscribers", () => [1001, 1002]);
  mock.method(ponteService, "getPonteStatus", async () => "✅ Ponte liberada");

  const bot = {
    telegram: {
      sendMessage: mock.fn(async () => Promise.resolve())
    }
  };

  // Schedule job and trigger manually
  const task = scheduleDailyJob(bot);

  // In our mocked version, `cron.schedule` returns an object with a `.trigger()` method
  await task.trigger();

  // Assertions
  assert.equal(ponteService.getPonteStatus.mock.callCount(), 1, "Should fetch ponte status once");
  assert.equal(bot.telegram.sendMessage.mock.callCount(), 2, "Should send messages to all subscribers");
  assert.match(bot.telegram.sendMessage.mock.calls[0].arguments[1], /Ponte/);
});
