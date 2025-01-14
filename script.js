"use strict";
let title = "lesson02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 27;
const rollback = 40;
let fullPrice = 150000;
let adaptive = false;

let screensLow = screens.toLowerCase();

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);

// console.log(screens.length);
// console.log(
//   "Стоимость верстки экранов " + screenPrice + " рублей долларов/гривен/юани"
// );
// console.log(
//   "Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани"
// );
// console.log(screensLow.split());
// console.log(
//   "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
// );

title = prompt("Как называется ваш проект?"); // спросим в всплыв.окошке и ответ запишем в переменную
screens = prompt("Какие типы экранов нужно разработать?");
screenPrice = +prompt("Сколько будет стоить данная работа?");
adaptive = confirm("Нужен ли адаптив на сайте?"); // вопрос с булевыми ответами
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

fullPrice = screenPrice + servicePrice1 + servicePrice2;
let rollbackPerc = fullPrice * (rollback / 100);
let servicePercentPrice = fullPrice - rollbackPerc;

console.log("Название проекта: " + title); //---------------------------------------------
console.log("Типы экранов: " + screens); //---------------------------------------------
console.log("Цена работы: " + screenPrice); //---------------------------------------------
console.log("Нужен адаптив?: " + adaptive); //---------------------------------------------
console.log("Доп.услуга 1: " + service1); //---------------------------------------------
console.log("Цена доп.услуги 1: " + servicePrice1); //---------------------------------------------
console.log("Доп.услуга 2: " + service2); //---------------------------------------------
console.log("Цена доп.услуги 2: " + servicePrice2); //---------------------------------------------
console.log("Итоговая стоимость с доп.усл.: " + fullPrice); //---------------------------------------------
console.log("Откат посреднику: " + rollbackPerc); //---------------------------------------------
console.log("Итоговая стоимость после вычетов: " + servicePercentPrice); //---------------------------------------------

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что-то пошло не так!");
}
