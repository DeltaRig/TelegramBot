import fetch from "node-fetch";

const TOKEN = "7144304407:AAEk6mYf6cSoJjbtjdMIqjT2Stm7YL6iriQ";
const URL = `https://api.telegram.org/bot${TOKEN}/getMe`;

fetch(URL)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
