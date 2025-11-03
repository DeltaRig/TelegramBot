import fs from "fs";
import path from "path";

const filePath = path.resolve("src/data/subscribers.json");

function loadSubscribers() {
  try {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

function saveSubscribers(subscribers) {
  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
}

export function addSubscriber(chatId) {
  const subs = loadSubscribers();
  if (!subs.includes(chatId)) {
    subs.push(chatId);
    saveSubscribers(subs);
  }
}

export function removeSubscriber(chatId) {
  const subs = loadSubscribers().filter((id) => id !== chatId);
  saveSubscribers(subs);
}

export function getSubscribers() {
  return loadSubscribers();
}
