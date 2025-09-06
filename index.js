import TelegramBot from "node-telegram-bot-api";
import { handleCommand } from "./case.js";

// === CONFIG ===
// isi token dari BotFather
const token = "ISI_TOKEN_BOT_DISINI";  

// isi dengan ID Telegram kamu (owner)
const ownerId = 123456789;  

// === INIT BOT ===
const bot = new TelegramBot(token, { polling: true });

console.log("✅ Bot Telegram sudah aktif!");

// === LISTENER PESAN ===
bot.on("message", async (msg) => {
  const text = msg.text || "";

  // kalau pakai prefix titik
  if (text.startsWith(".")) {
    return handleCommand(bot, msg, text, ownerId);
  }
});
