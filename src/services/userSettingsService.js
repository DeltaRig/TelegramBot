const userSettings = new Map(); // chatId -> { lang }

export function getUserLang(chatId) {
  return userSettings.get(chatId)?.lang || "pt";
}

export function setUserLang(chatId, lang) {
  userSettings.set(chatId, { lang });
}
