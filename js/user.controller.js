'use strict';

function onInit() {
  createBooks();
  renderBooks();
}

function renderBooks() {
  var strHtmls = gBooks.map(
    (book) =>
      `<tr>
                <td>${book.id}</td>
                <td>${book.bookName} </td>
                <td>${book.price + '$'}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" onclick="onReadAbout(${book.id})">Read</button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-warning"  onclick="onUpdateBook(${book.id})">Update</button>
                    </td>
                    <td>
                    
                    <button type="button" class="btn btn-outline-danger" onclick="onRemoveBook(${book.id})">Delete</button>
                </td>
     

            </tr>`
  );
  const elTableBody = document.querySelector('.table-body');
  elTableBody.innerHTML = strHtmls.join('');
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onAddBook() {
  var bookName = prompt('please name the book to add');
  var price = prompt('please name the price to add');
  if (bookName && price) {
    addBook(bookName, price);
    renderBooks();
  }
}

function onUpdateBook(bookId) {
  var book = getBookById(bookId);
  const newPrice = +prompt('price?', book.price);
  if (newPrice === book.price) return;
  if (!newPrice) return;
  updateBook(bookId, newPrice);
  renderBooks();
}

function onReadAbout(bookId) {
  var book = getBookById(bookId);

  const elModal = document.querySelector('.modal');

  elModal.querySelector('h3').innerText = book.bookName;
  elModal.querySelector('h4 span').innerText = book.price + '$';
  elModal.querySelector('.about-book').innerText = book.about;
  elModal.querySelector('.about-author').innerText = book.aboutAuthor;
  elModal.querySelector('.rating span').innerText = book.rate;

  elModal.classList.add('open');
}
function onCloseModal() {
  const elModal = document.querySelector('.modal');

  elModal.classList.remove('open');
}

function onChangeRate(diff, bookId) {
  const currRate = changeRating(bookId, diff);
  const elNum = document.querySelector('.rating span');
  elNum.innerText = currRate;
}

function renderRateBtns(bookId) {
  var strHTML = `
    <button class="minus" onclick="onChangeRate(-1, '${bookId}')">-</button>
    <span>0</span>
    <button class="plus" onclick="onChangeRate(1, '${bookId}')">+</button>`;

  document.querySelector('.rating').innerHTML = strHTML;
}

function setRateBtnsDisable(rate) {
  document.querySelector('.plus').disabled = rate >= 10 ? true : false;
  document.querySelector('.minus').disabled = rate <= 0 ? true : false;
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');
  doTrans();
  renderBooks();
}
