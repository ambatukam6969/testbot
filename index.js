import TelegramBot from "node-telegram-bot-api";
import { handleCommand } from "./case.js";

// === CONFIG ===
// isi token dari BotFather
const token = "8416044898:AAHeSa3JdW1Dz1F3J8U6ChTNe0t7C45Jo4g";  

// isi dengan ID Telegram kamu (owner)
const ownerId = 6405523998;  

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
