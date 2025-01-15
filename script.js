"use strict";
const rollback = 40;
let title = prompt("Как называется ваш проект?", "lesson03"); // спросим в всплыв.окошке и ответ запишем в переменную
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "20000rub");
let adaptive = confirm("Нужен ли адаптив на сайте?"); // вопрос с булевыми ответами
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
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
