'use strict';

const STORAGE_KEY = 'bookDB';
const bookNames = ['Harry Potter', 'Kafka on the Shore', 'easy way to stop smoking'];

var gBooks;
var gId = 1;

createBooks();
function createBook(bookName, price = +getRandomIntInclusive(40, 80).toFixed(2)) {
  return {
    id: gId++,
    bookName,
    price,
    imgUrl: '',
    about: makeLorem(80),
    aboutAuthor: makeLorem(10),
    rate: 0,
  };
}

function createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [];
    // return the default books array
    for (var i = 0; i < bookNames.length; i++) {
      var book = bookNames[i];
      books.push(createBook(book));
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => book.id === bookId);
  console.log(bookId);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function addBook(bookName, price, id) {
  const book = createBook(bookName, price, id);
  gBooks.unshift(book);

  _saveBooksToStorage();
  return book;
}

function getBookById(bookId) {
  return gBooks.find((book) => bookId === book.id);
}

function updateBook(bookId, newPrice) {
  const book = getBookById(bookId);
  if (!book) return;
  book.price = newPrice;
  _saveBooksToStorage();
  return book;
}

function getBooks() {
  return gBooks;
}

function changeRating(diff, bookId) {
  const book = getBookById(bookId);
  book.rate += diff;
  _saveBooksToStorage();
  return book;
}
