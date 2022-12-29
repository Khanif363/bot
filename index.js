const TelegramBot = require("node-telegram-bot-api");

// Ganti dengan API token yang Anda dapatkan dari halaman My Bots
// const token = "5818810312:AAHEBjDDwT5661xLXp-ySSeD6G8811Lp7Vk";
const token = "5818810312:AAEx-HeTkfh616LUXYZaMYRDYDLbQ557mI4";

// Buat bot baru
const bot = new TelegramBot(token, { polling: true });

// Daftar pengguna yang terdaftar di bot
const userList = [];

// Tanggapi pesan masuk
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userFirstName = msg.from.first_name;
  //   console.log("NEW MESSAGE");
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

    // Buat room baru dengan kedua pengguna
    bot.createNewGroupChat([userId, otherUserId]).then((chat) => {
      const roomId = chat.id;

      // Kirim pesan ke pengguna yang terhubung
      bot.sendMessage(roomId, `Halo, Anda terhubung dengan ${userFirstName}!`);

      // Tanggapi pesan yang dikirim di dalam room
      bot.on("message", (msg) => {
        // Pastikan pesan dikirim di dalam room yang sama
        if (msg.chat.id === roomId) {
          // Kirim pesan ke pengguna lain di dalam room
          bot.sendMessage(otherUserId, msg.text);
        }
      });
    });
  } 
//   else {
//     bot.on("message", (msg) => {
//       // Pastikan pesan dikirim di dalam room yang sama
//       if (msg.chat.id === roomId) {
//         // Kirim pesan ke pengguna lain di dalam room
//         bot.sendMessage(otherUserId, msg.text);
//       }
//     });
//   }
});
