"use strict";

// Lesson12
const title = document.getElementsByTagName("h1"); //Кальк верстки
let screenSelect = document.querySelector(".screen > div > select"); //список экранов
let screenInput = document.querySelector(".screen > div > input[type=text]"); //список экранов
let screens = document.querySelectorAll(".screen"); //блок экранов(select+input)
const btnStart = document.getElementById("start"); //Рассчитать
const btnReset = document.getElementsByClassName("handler_btn").reset; //удалили по заданию
const btnPlus = document.querySelector(".screen-btn"); //кнопка +
const items = document.querySelectorAll(".other-items"); //все внутри дополнительно
const itemPercent = document.querySelectorAll(".percent"); //в доп адаптив 2шт(%)
const itemNumber = document.querySelectorAll(".number"); //в доп фиксир сум 5шт(руб)
const inputRange = document.querySelector(
  ".rollback > div > input[type='range']"
); //откат посреднику (ползунок)
const spanRange = document.querySelector(".rollback > div > .range-value"); //текст под ползунком
const total = document.getElementsByClassName("total-input")[0]; //стоим вёрстки
const totalScreens = document.getElementsByClassName("total-input")[1]; //колич экр
const totalServices = document.getElementsByClassName("total-input")[2]; //стоим доп усл
const totalFull = document.getElementsByClassName("total-input")[3]; //итоговая стоим
const totalRollBack = document.getElementsByClassName("total-input")[4]; //стоим с уч отката

const appData = {
  rollback: 10,
  title: "",
  screens: [],
  checking: [],
  screenPrice: 0,
  adaptive: true,
  servicePercentPrice: 0,
  servicePercentNumber: 0,
  fullPrice: 0,
  getServicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  screenCount: 0,

  init: function () {
    appData.addTitle();
    btnPlus.addEventListener("click", appData.addScreenCloneBlock);
    btnStart.addEventListener("click", appData.btnStartCheck);
    btnStart.addEventListener("mouseenter", appData.btnStartEn);
    inputRange.addEventListener("input", appData.rangeFunc);
    btnStart.style.opacity = 0.5;
    // appData.logger();
  },

  start: function () {
    // appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.clearValues();
    // console.log(appData);
  },

  addScreens: function () {
    appData.screens.length = 0;
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addScreenCloneBlock: function () {
    screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  //создаем массив из доп услуг (%)
  addServices: function () {
    itemPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    //создаем массив из доп услуг (фиксир)
    itemNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  //сброс disabled кнопки при наведении на неё
  btnStartEn: function () {
    btnStart.disabled = false;
  },

  btnStartCheck: function () {
    appData.addScreens();

    btnStart.style.opacity = 1;

    for (let key in appData.screens) {
      // let name = appData.screens[key].name;
      // let price = appData.screens[key].price;
      // if (appData.isNumber(price) & (name != "Тип экранов")) {
      //   console.log("No Err");
      //   btnStart.style.opacity = 1;
      //   return appData.start();
      // } else if (!appData.isNumber(price) || name == "Тип экранов") {
      //   console.log(appData.screens);
      //   appData.screens.splice(key, -1);
      //   return;
      // }
    }
    const checkArrPrice = appData.screens.some(function (item) {
      //true, если ошибка
      return !appData.isNumber(item.price);
    });

    const checkArrName = appData.screens.some(function (item) {
      return item.name == "Тип экранов";
    });

    if (!checkArrPrice & !checkArrName) {
      console.log("No Err");
      btnStart.disabled = false;
      btnStart.style.opacity = 1;
      return appData.start();
    } else if (checkArrPrice || checkArrName) {
      console.log("Err");
      btnStart.disabled = true;
      btnStart.style.opacity = 0.5;
      appData.screens.length = 0;
      return;
    }
  },

  // checkCopy: function () {
  //   console.log(appData.checking);
  //   appData.checking = appData.screens;
  //   console.log(appData.checking);
  // },

  addPrices: function () {
    // appData.checkCopy();

    //суммируем выбранные экраны (сумма произведения экранов на их колич.)
    appData.screens.reduce(function (prev, item) {
      if (prev == item) {
      } else {
        appData.screenPrice = prev + +item.price;
        return appData.screenPrice;
      }
    }, 0);

    //доп. услуги (%)
    for (let key in appData.servicesPercent) {
      appData.servicePercentPrice +=
        (appData.screenPrice * appData.servicesPercent[key]) / 100;
    }

    //доп. услуги (фиксированные)
    for (let key in appData.servicesNumber) {
      appData.servicePercentNumber += appData.servicesNumber[key];
    }

    //полная стоим.
    appData.fullPrice =
      appData.screenPrice +
      appData.servicePercentNumber +
      appData.servicePercentPrice;

    //стоим. с откатом
    appData.getServicePercentPrices =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);

    //сумма всех экранов
    for (let key in appData.screens) {
      appData.screenCount += appData.screens[key].count;
    }
  },

  showResult: function () {
    total.value = appData.screenPrice; //стоим. вёрстки
    totalScreens.value = appData.screenCount;
    totalServices.value =
      appData.servicePercentPrice + appData.servicePercentNumber;
    totalFull.value = appData.fullPrice;
    totalRollBack.value = parseInt(appData.getServicePercentPrices);
  },

  addTitle: function () {
    appData.title = title[0].textContent;
    document.title = appData.title;
  },

  rangeFunc: function (event) {
    spanRange.textContent = +event.target.value;
    appData.rollback = +event.target.value;
  },

  clearValues: function () {
    //обнуляем знач чтобы не суммировать при след расчёте
    appData.servicePercentPrice = 0;
    appData.servicePercentNumber = 0;
    appData.screenCount = 0;
  },

  //true - нет ошибки в вводе чисел
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  logger: function () {
    console.log(appData.services);
    console.log(appData.title);
    console.log("Итог после вычетов: " + appData.getServicePercentPrices);

    for (let i = 0; i < inputTotal.length; i++) {
      console.dir(inputTotal[i]);
    }
  },
};

// вызов ф-ции:
appData.init();
