"use strict";

// Lesson09
const titleNew = document.getElementsByTagName("h1").title.textContent;
const btnHandler = document.getElementsByClassName("handler_btn");
const btnStart = btnHandler.start;
const btnReset = document.getElementsByClassName("handler_btn").reset;
const screenBtn = document.querySelector(".screen-btn").textContent;
const items = document.querySelectorAll(".other-items");
const itemsPercent = document.querySelectorAll(".percent");
const itemsNumber = document.querySelectorAll(".number");
const inputRange = document.querySelector(
  ".rollback > div > input[type='range']"
);
const spanRange = document.querySelector(".rollback > div > .range-value");
const inputTotal = document.getElementsByClassName("total-input");
let screenBlck = document.querySelectorAll(".screen > div > select");

// go to line 181 -->

const appData = {
  rollback: 10,
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(
      appData.fullPrice,
      appData.getRollbackPerc(appData.fullPrice, appData.rollback)
    );
    appData.getRollbackPerc(appData.fullPrice, appData.rollback); // callback функция для юза в getServicePercentPrices
    appData.logger();
  },

  // ASKING:
  asking: function () {
    do {
      appData.title = document.getElementsByTagName("h1").title.textContent;
    } while (appData.isString(appData.title));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;
      do {
        name = prompt(
          "Какие типы экранов нужно разработать?",
          "Простые, Сложные, Интерактивные"
        );
      } while (appData.isString(name));
      do {
        price = prompt("Сколько будет стоить данная работа?", "15000");
      } while (!appData.isNumber(price));
      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
      } while (appData.isString(name));
      do {
        price = prompt("Сколько это будет стоить?", "7600");
      } while (!appData.isNumber(price));
      name = i + name;
      appData.services[name] = +price;
    }
  },
  // ADDPRICES:
  addPrices: function () {
    // исп REDUCE:
    appData.screens.reduce(function (prev, item) {
      return (appData.screenPrice = prev + +item.price);
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
    // }
  },

  getFullPrice: function (price1, price2) {
    return (appData.fullPrice = price1 + price2);
  },

  // Первый символ с большой буквы, остальные с маленькой:
  getTitle: function (titleFunc) {
    return (
      titleFunc.trimStart()[0].toUpperCase() +
      titleFunc.trimStart().slice(1).toLowerCase()
    );
  },

  // Итоговая стоимость после вычетов rollbackPerc:
  getServicePercentPrices: function (fullPrNum) {
    return (
      fullPrNum - appData.getRollbackPerc(appData.fullPrice, appData.rollback)
    );
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

  isString: function (num) {
    const regs = /^[.`*&^%$#@!(_)=+ ]+$/;
    let rez = regs.test(num);
    if (num === null) {
      return (
        !isNaN(parseFloat(num)) ||
        rez ||
        num === null ||
        num.trim().length === 0 ||
        isFinite(num)
      );
    } else {
      return (
        !isNaN(parseFloat(num)) ||
        rez ||
        num.trim().length === 0 ||
        isFinite(num)
      );
    }
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  logger: function () {
    console.log(appData.services);
    console.log(appData.title);
    console.log("screenPrice: " + appData.screenPrice);
    console.log("Доп.услуги: " + appData.allServicePrices);
    console.log(
      "Вёрстка и доп. услуги: " +
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices) +
        " rub"
    );
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(
      "Итог после вычетов: " +
        appData.getServicePercentPrices(appData.fullPrice)
    );
    // for (let key in appData.asking) {
    //   console.log(key + ": " + appData[key]);
    // }
  },
};

// вызов ф-ции:
// appData.start();

//
// -- > Lesson09, Console:
console.log(titleNew);
console.dir(btnStart);
console.dir(btnReset);
console.log(screenBtn);
console.dir(items);
console.dir(itemsPercent);
console.dir(itemsNumber);
console.dir(inputRange);
console.dir(spanRange);
for (let i = 0; i < inputTotal.length; i++) {
  console.dir(inputTotal[i]);
}
console.log(screenBlck);
