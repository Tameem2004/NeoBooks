const TelegramBot = require('node-telegram-bot-api');
// const { NeoContract } = require('neo-one-client');

const bot = new TelegramBot('6735594191:AAF3k4XCfpnUvpOTa5FRl-ymZh6nLMKNLK4', {polling: true});
// const neoContract = new NeoContract('NeoX T4 contract address');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome! You can purchase books using NeoX T4. Type /books to see available books.');
});

bot.onText(/\/books/, (msg) => {
  // Fetch and display book listings
  const books = getAvailableBooks();
  let response = 'Available books:\n';
  books.forEach((book, index) => {
    response += `${index + 1}. ${book.title} - ${book.price} T4\n`;
  });
  bot.sendMessage(msg.chat.id, response);
});

bot.onText(/\/buy (\d+)/, async (msg, match) => {
  const bookIndex = parseInt(match[1]) - 1;
  const book = getAvailableBooks()[bookIndex];
  const userId = msg.chat.id;

  bot.sendMessage(userId, `Send ${book.price} T4 to this address: 0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe`);

  // Listen for blockchain payment confirmation
  const isPaid = await checkPayment(book.price, userId);
  if (isPaid) {
    bot.sendDocument(userId, book.pdfUrl);
  } else {
    bot.sendMessage(userId, 'Payment not received.');
  }
});

async function checkPayment(amount, userId) {
  // Add logic to check if payment has been received on NeoX T4
  return true;  // For now, assume payment is successful
}

function getAvailableBooks() {
  return [
    {title: 'Book 1', price: 10, pdfUrl: 'path/to/book1.pdf'},
    {title: 'Book 2', price: 15, pdfUrl: 'path/to/book2.pdf'}
  ];
}
