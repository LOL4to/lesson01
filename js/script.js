"use strict";

// Lesson12
const title = document.getElementsByTagName("h1"); //Кальк верстки
let screenSelect = document.querySelector(".screen > div > select"); //список экранов
let screenInput = document.querySelector(".screen > div > input[type=text]"); //список экранов
let screens = document.querySelectorAll(".screen"); //блок экранов(select+input)
const btnStart = document.getElementById("start"); //кн Рассчитать
const btnReset = document.getElementById("reset"); //кн Сброс(disabled = true)
const btnPlus = document.querySelector(".screen-btn"); //кнопка +
const items = document.querySelectorAll(".other-items"); //все внутри дополнительно
const itemPercent = document.querySelectorAll(".percent"); //в доп адаптив 2шт(%)
const itemNumber = document.querySelectorAll(".number"); //в доп фиксир сум 5шт(руб)
const inputRange = document.querySelector(
  ".rollback > div > input[type='range']"
); //откат посреднику (ползунок)
const spanRange = document.querySelector(".rollback > div > .range-value"); //текст под ползунком
const cms = document.querySelector(".cms"); //вся cms
const cmsInputCheck = document.getElementById("cms-open"); //cms checkbox
const cmsHiddenControls = cms.querySelector(".hidden-cms-variants"); //скрытая панель cms
const cmsSelect = document.getElementById("cms-select"); //инпут cms слева
const cmsInput = cms.querySelector("#cms-other-input"); //скрытый инпут со знач
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
  cmsPrice: 0,
  getServicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  screenCount: 0,

  init: function () {
    this.addTitle();
    btnPlus.addEventListener("click", (event) => {
      this.addScreenCloneBlock(event);
    });
    btnStart.addEventListener("click", (event) => {
      this.btnStartCheck(event);
    });
    btnStart.addEventListener("mouseenter", (event) => {
      this.btnStartEn(event);
    });
    inputRange.addEventListener("input", (event) => {
      this.rangeFunc(event);
    });
    btnReset.addEventListener("click", (event) => {
      // event.preventDefault();
      this.resetAfterStart();
    });
    cms.addEventListener("click", () => {
      this.cmsFunc();
    });
    // btnStart.style.opacity = 0.5;
    // this.logger();
  },

  start: function () {
    // this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.clearValues();
    // console.log(appData);
  },

  addScreens: function () {
    this.screens.length = 0;
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    }, this); //фича с this для forEach
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
        this.servicesPercent[label.textContent] = +input.value;
      }
    }, this);

    //создаем массив из доп услуг (фиксир)
    itemNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    }, this);
  },

  //сброс disabled кнопки при наведении на неё
  btnStartEn: function () {
    btnStart.disabled = false;
  },

  btnStartCheck: function () {
    this.addScreens();

    btnStart.style.opacity = 1;

    const checkArrPrice = this.screens.some((item) => {
      //true, если ошибка
      return !this.isNumber(item.price);
    });

    const checkArrName = this.screens.some((item) => {
      return item.name == "Тип экранов";
    });

    if (!checkArrPrice & !checkArrName) {
      // btnStart.style.opacity = 1;
      console.log("No Err");
      btnStart.disabled = false;
      btnPlus.disabled = true;
      return this.start();
    } else if (checkArrPrice || checkArrName) {
      // btnStart.style.opacity = 0.5;
      console.log("Err");
      btnStart.disabled = true;
      this.screens.length = 0;
      return;
    }
  },

  addPrices: function () {
    //суммируем выбранные экраны (сумма произведения экранов на их колич.)
    this.screens.reduce((prev, item) => {
      if (prev == item) {
      } else {
        this.screenPrice = prev + +item.price;
        return this.screenPrice;
      }
    }, 0);

    //доп. услуги (%)
    for (let key in this.servicesPercent) {
      this.servicePercentPrice +=
        (this.screenPrice * this.servicesPercent[key]) / 100;
    }

    //доп. услуги (фиксированные)
    for (let key in this.servicesNumber) {
      this.servicePercentNumber += this.servicesNumber[key];
    }

    //сумма cms
    const cmsOption = cms.querySelectorAll("option");
    let cmsValue = 0;
    cmsOption.forEach((element) => {
      if (element.selected) {
        cmsValue = element.value;
      }
      if (cmsValue === "other") {
        this.cmsPrice = +cmsInput.value;
      } else if (cmsValue == 50) {
        this.cmsPrice = 50;
      } else {
        this.cmsPrice = 0;
      }
    });

    //полная стоим. (с учётом cms панели)
    let fullPriceBefore = 0;
    fullPriceBefore =
      this.screenPrice + this.servicePercentNumber + this.servicePercentPrice;
    this.fullPrice = fullPriceBefore + fullPriceBefore * (this.cmsPrice / 100);

    //стоим. с откатом
    this.getServicePercentPrices =
      this.fullPrice - this.fullPrice * (this.rollback / 100);

    //сумма всех экранов
    for (let key in this.screens) {
      this.screenCount += this.screens[key].count;
    }
  },

  showResult: function () {
    total.value = this.screenPrice; //стоим. вёрстки
    totalScreens.value = this.screenCount;
    totalServices.value = this.servicePercentPrice + this.servicePercentNumber;
    totalFull.value = this.fullPrice;
    totalRollBack.value = parseInt(this.getServicePercentPrices);
  },

  addTitle: function () {
    this.title = title[0].textContent;
    document.title = this.title;
  },

  rangeFunc: function (event) {
    spanRange.textContent = +event.target.value;
    this.rollback = +event.target.value;
  },

  //скрытая инпут-панель
  cmsFunc: function () {
    //показать/скрыть панель cms
    if (cmsInputCheck.checked) {
      cmsHiddenControls.style.display = "flex";
    } else {
      cmsHiddenControls.style.display = "none";
    }
    //действия при выборе инпута
    const cmsOption = cms.querySelectorAll("option");
    const cmsInputBlock = cms.querySelector(".main-controls__input");

    cmsOption.forEach((element) => {
      if ((element.value === "other") & element.selected) {
        return (cmsInputBlock.style.display = "block");
      } else if ((element.value == 50) & element.selected) {
        return (cmsInputBlock.style.display = "none");
      } else {
        return (cmsInputBlock.style.display = "none");
      }
    });
  },

  clearValues: function () {
    //обнуляем знач чтобы не суммировать при след расчёте
    this.servicePercentPrice = 0;
    this.servicePercentNumber = 0;
    this.screenCount = 0;
    //запрет нажатия на инпуты
    screens.forEach(function (elem) {
      const input = elem.querySelector("input[type=text]");
      const select = elem.querySelector("select");
      input.disabled = true;
      select.disabled = true;
    });
    //скрыть кн. Рассчитать, показ кн. Ресет
    btnReset.style.display = "block";
    btnStart.style.display = "none";
    //запрет нажатия на cms инпуты
    cmsSelect.disabled = true;
    cmsInput.disabled = true;
  },

  resetAfterStart: function () {
    screens.forEach(function (elem) {
      const input = elem.querySelector("input[type=text]");
      const select = elem.querySelector("select");
      // input.textContent = "";
      input.disabled = false;
      select.disabled = false;
      select[0].selected;
      input.value = "";
      select.value = "";

      // this.elem.length = 0;
    });
    //удал input'ы и select'ы типа экранов, кроме начального
    for (let i = 1; i < screens.length; i++) {
      // screens[i].innerHTML = "";
      screens[i].remove();
      screens[i].remove();
    }
    this.screens.length = 0;

    //убираем все галочки
    const inputCheckbox = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < inputCheckbox.length; i++) {
      inputCheckbox[i].checked = false;
    }

    //убираем знач ползунка
    inputRange.value = 0;
    spanRange.textContent = "0";

    //cms-инпут скрываем обратно
    cmsHiddenControls.style.display = "none";
    //запрет нажатия на cms инпуты
    cmsSelect.disabled = false;
    cmsInput.disabled = false;
    cmsSelect[0].selected = true;
    cmsInput.value = "";
    cmsInput.placeholder = "haha";

    //все значения на чтение Итого = 0
    this.screenPrice = 0;
    this.screenCount = 0;
    this.servicePercentPrice = 0;
    this.servicePercentNumber = 0;
    this.fullPrice = 0;
    this.getServicePercentPrices = 0;
    this.showResult();

    btnStart.style.display = "block";
    btnReset.style.display = "none";
    btnPlus.disabled = false;
  },

  //true - нет ошибки в вводе чисел
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  logger: function () {
    console.log(this.services);
    console.log(this.title);
    console.log("Итог после вычетов: " + this.getServicePercentPrices);

    for (let i = 0; i < inputTotal.length; i++) {
      console.dir(inputTotal[i]);
    }
  },
};

// вызов ф-ции:
appData.init();
