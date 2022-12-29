const TelegramBot = require("node-telegram-bot-api");

const Promise = require("bluebird");
Promise.config({
  cancellation: true,
});

// Ganti dengan API token yang Anda dapatkan dari halaman My Bots
const token = "5818810312:AAHqwt5drp3EgWVs_Qx0QCG9ea17Z7uPeD4";

// Buat bot baru
const bot = new TelegramBot(token, { polling: true });

// Daftar pengguna yang terdaftar di bot
const userList = [];

// Tanggapi pesan masuk
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userFirstName = msg.from.first_name;

  // Tambahkan pengguna ke daftar jika belum terdaftar
  if (!userList.includes(userId)) {
    userList.push(userId);
  }

  // Tanggapi perintah "/connect"
  if (msg.text === "/connect") {
    // Dapatkan pengguna lain secara random
    const otherUserId = userList[Math.floor(Math.random() * userList.length)];
    while (otherUserId === userId) {
      // Pastikan pengguna lain tidak sama dengan pengguna yang mengirim perintah
      otherUserId = userList[Math.floor(Math.random() * userList.length)];
    }

    // Kirim pesan ke pengguna yang terhubung
    bot.sendMessage(
      otherUserId,
      `Halo Friend.., Saat ini kamu sedang terhubung dengan ${userFirstName}!\nAyo mengobrol dengannya &#128522;`
    );
  }
});
