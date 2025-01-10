let title = "lesson02";
let screens = "Простые, Сложные, Интерактивные";
const screenPrice = 27;
const rollback = 40;
const fullPrice = 150000;
let adaptive = false;

let screensLow = screens.toLowerCase();

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(
  "Стоимость верстки экранов " + screenPrice + " рублей долларов/гривен/юани"
);
console.log(
  "Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани"
);
console.log(screensLow.split());
console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
