"use strict";
const rollback = 40;
let title = " КаЛьКулятор Верстки";
let screens;
let screenPrice;
let servicePrice1;
let servicePrice2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
// ------------------Lesson04: ------------------

// 1) Тип - function expression:
function getAllServicePrices(price1, price2) {
  return (allServicePrices = price1 + price2);
}

// 2) Тип - function declaration:
const getFullPrice = function (price1, price2) {
  return (fullPrice = price1 + price2);
};

// 3) первый символ с большой буквы, остальные с маленькой:
const getTitle = function (titleFunc) {
  return (
    titleFunc.trimStart()[0].toUpperCase() +
    titleFunc.trimStart().slice(1).toLowerCase()
  );
};
// trimStart() убирает пробел с начала строки до первого символа;
// нулевой символ[0] поднимаем с toUpperCase(), и ещё раз trimStart() убирает пробел,
// чтобы slice(1) начал запись с символа [1] без учета пробелов и, затем, опускаем регистр строк.

// 4) Итоговая стоимость после вычетов rollbackPerc:
const getServicePercentPrices = function (fullPrNum) {
  return (servicePercentPrice =
    fullPrNum - getRollbackPerc(fullPrice, rollback));
};

const getRollbackPerc = function (getPrice, getRoll) {
  return getPrice * (getRoll / 100);
};

//5) typeOf функция:
const showTypeOf = function (varType) {
  console.log(varType, typeof varType);
};

//6) ф-ция getRollbackMessage:
const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так!";
  }
};

// получение значения переменной screenPrice циклом do while
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", "15000");
  } while (!isNumber(screenPrice));
  do {
    servicePrice1 = prompt("Сколько это будет стоить?", "2400");
  } while (!isNumber(servicePrice1));
  do {
    servicePrice2 = prompt("Сколько это будет стоить?", "7600");
  } while (!isNumber(servicePrice2));
};

// вызовы ф-ции с соотв. аргументами:
asking();
getAllServicePrices(servicePrice1, servicePrice2);
getFullPrice(screenPrice, allServicePrices);
getTitle(title);
getServicePercentPrices(fullPrice, getRollbackPerc(fullPrice, rollback));
getRollbackPerc(fullPrice, rollback); // callback функция для юза в getServicePercentPrices

showTypeOf(getTitle(title));
showTypeOf(screens);
showTypeOf(screenPrice);
showTypeOf(fullPrice);
showTypeOf(servicePercentPrice);

console.log(
  "Сумма всех доп. услуг: " +
    getAllServicePrices(servicePrice1, servicePrice2) +
    " rub"
);
console.log(
  "Вёрстка и доп. услуги: " +
    getFullPrice(screenPrice, allServicePrices) +
    " rub"
);
console.log(getRollbackMessage(fullPrice));
console.log(
  "Итоговая стоимость после вычетов: " +
    getServicePercentPrices(fullPrice) +
    " rub"
);
