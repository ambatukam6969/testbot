export async function handleCommand(bot, msg, text, ownerId) {
  const chatId = msg.chat.id;
  const args = text.trim().split(/\s+/);
  const command = args.shift().toLowerCase(); // contoh ".menu"
  const senderId = msg.from.id;

  switch (command) {
    case ".menu":
      await bot.sendMessage(chatId, "📌 Menu Utama:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🏓 Ping", callback_data: "ping" }],
            [{ text: "💬 Say Halo", callback_data: "say Halo semua!" }],
            [{ text: "👑 Owner", callback_data: "owner" }]
          ],
        },
      });
      break;

    case ".ping":
      await bot.sendMessage(chatId, "🏓 Pong!");
      break;

    case ".say":
      if (args.length === 0) return bot.sendMessage(chatId, "❌ Masukkan teks!");
      await bot.sendMessage(chatId, args.join(" "));
      break;

    case ".owner":
      await bot.sendMessage(chatId, `👑 Owner ID: ${ownerId}`);
      break;

    case ".eval":
      if (senderId !== ownerId)
        return bot.sendMessage(chatId, "❌ Hanya owner yang bisa pakai command ini!");

      try {
        let code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = JSON.stringify(evaled, null, 2);
        await bot.sendMessage(chatId, `✅ Eval:\n${evaled}`);
      } catch (e) {
        await bot.sendMessage(chatId, `❌ Error:\n${e.message}`);
      }
      break;

    default:
      await bot.sendMessage(chatId, "❓ Command tidak dikenali. Coba ketik .menu");
      break;
  }

  // === Handler untuk inline button ===
  bot.on("callback_query", async (query) => {
    const data = query.data;
    const fromId = query.message.chat.id;

    if (data === "ping") {
      await bot.sendMessage(fromId, "🏓 Pong (via button)!");
    } else if (data.startsWith("say")) {
      const msg = data.replace("say ", "");
      await bot.sendMessage(fromId, `💬 ${msg}`);
    } else if (data === "owner") {
      await bot.sendMessage(fromId, `👑 Owner ID: ${ownerId}`);
    }
    await bot.answerCallbackQuery(query.id);
  });
}
