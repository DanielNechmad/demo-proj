'use strict';
var gCurrLang = 'en';
var gTrans = {
  title: {
    en: 'Welcome to my bookShop',
    es: 'Bienvenido a mi librería',
    he: 'ברוכים הבאים לחנות הספרים שלי',
  },
  createNewBook: {
    en: 'Create new book',
    es: 'Crear nuevo libro',
    he: 'צור ספר חדש',
  },
  id: {
    en: 'Id',
    es: 'Identificación',
    he: 'מספר זהות',
  },
  bookName: {
    en: 'Title',
    es: 'Nombre del libro',
    he: 'שם הספר',
  },
  price: {
    en: 'Price',
    es: 'Precio',
    he: 'מחיר',
  },
  action: {
    en: 'Actions',
    es: 'Comportamiento',
    he: 'פעולות',
  },
  read: {
    en: 'Read',
    es: 'Leer',
    he: 'קרא',
  },
  update: {
    en: 'Update',
    es: 'Actualizar',
    he: 'עדכון',
  },
  delete: {
    en: 'Delete',
    es: 'Borrar',
    he: 'מחיקה',
  },
};

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';

  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans.en;
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var transKey = el.dataset.trans;
    var txt = getTrans(transKey);

    if (el.localName === 'input') {
      el.setAttribute('placeholder', txt);
      // el.placeholder = txt
    } else el.innerText = txt;
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatCurrency(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}
