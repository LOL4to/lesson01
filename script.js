"use strict";

const appData = {
  rollback: 40,
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  servicePrice1: 0,
  servicePrice2: 0,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  asking: function () {
    let screenPriceStr;
    let servicePrice1Str;
    let servicePrice2Str;
    appData.title = prompt(
      "Как называется ваш проект?",
      " КаЛьКулятор Верстки"
    );
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    do {
      screenPriceStr = prompt("Сколько будет стоить данная работа?", "15000");
      appData.screenPrice = +screenPriceStr;
    } while (!appData.isNumber(screenPriceStr));
    do {
      servicePrice1Str = prompt("Сколько это будет стоить?", "2400");
      appData.servicePrice1 = +servicePrice1Str;
    } while (!appData.isNumber(servicePrice1Str));
    do {
      servicePrice2Str = prompt("Сколько это будет стоить?", "7600");
      appData.servicePrice2 = +servicePrice2Str;
    } while (!appData.isNumber(servicePrice2Str));
  },

  getAllServicePrices: function (price1, price2) {
    return (appData.allServicePrices = price1 + price2);
  },
  getFullPrice: function (price1, price2) {
    return (appData.fullPrice = price1 + price2);
  },
  // Первый символ с большой буквы, остальные с маленькой:
  getTitle: function (titleFunc) {
    return (
      titleFunc.trimStart()[0].toUpperCase() +
      titleFunc.trimStart().slice(1).toLowerCase()
      // trimStart() убирает пробел с начала строки до первого символа;
      // нулевой символ[0] поднимаем с toUpperCase(), и ещё раз trimStart() убирает пробел,
      // чтобы slice(1) начал запись с символа [1] без учета пробелов и, затем, опускаем регистр строк.
    );
  },

  // Итоговая стоимость после вычетов rollbackPerc:
  getServicePercentPrices: function (fullPrNum) {
    return (appData.servicePercentPrice =
      fullPrNum - appData.getRollbackPerc(appData.fullPrice, appData.rollback));
  },
  getRollbackPerc: function (getPrice, getRoll) {
    return getPrice * (getRoll / 100);
  },
  //5) typeOf функция:
  showTypeOf: function (varType) {
    console.log(varType, typeof varType);
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так!";
    }
  },
  // получение значения переменной screenPrice циклом do while
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  logger: function () {
    console.log(
      "Сумма всех доп. услуг: " +
        appData.getAllServicePrices(
          appData.servicePrice1,
          appData.servicePrice2
        ) +
        " rub"
    );
    console.log(
      "Вёрстка и доп. услуги: " +
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices) +
        " rub"
    );
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(
      "Итоговая стоимость после вычетов: " +
        appData.getServicePercentPrices(appData.fullPrice) +
        " rub"
    );
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
  },
  start: function () {
    appData.asking();
    appData.getAllServicePrices(appData.servicePrice1, appData.servicePrice2);
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(
      appData.fullPrice,
      appData.getRollbackPerc(appData.fullPrice, appData.rollback)
    );
    appData.getRollbackPerc(appData.fullPrice, appData.rollback); // callback функция для юза в getServicePercentPrices
    appData.logger();
  },
};

// вызов ф-ции:
appData.start();
