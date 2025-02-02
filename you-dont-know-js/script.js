"use strict";
let aside = document.querySelectorAll(".books");
let book = document.querySelectorAll(".book");
let bookTitle = document.querySelectorAll(".book > h2 > a");
let list = document.querySelectorAll(".book > ul");
let liElem = document.querySelectorAll(".book > ul")[0];
let elem = document.querySelectorAll("ul > li");
let bckImg = document.querySelectorAll("body");
let adv = document.querySelector(".adv");
// 1)
aside[0].prepend(book[1]);
book[0].after(book[4]);
aside[0].append(book[2]);
// 2)
bckImg[0].style.backgroundImage = "url(./image/you-dont-know-js.jpg)";
// 3)
bookTitle[4].textContent = "Книга 3. this и Прототипы Объектов";
// 4)
adv.style.display = "none";
// 5)
// внутри первого ul меняем местами li'шки (6й перед 4ым, и тд...)
list[0].insertBefore(liElem.children[6], liElem.children[4]);
list[0].insertBefore(liElem.children[8], liElem.children[5]);
list[0].insertBefore(liElem.children[2], liElem.children[10]);
// 5ый ul:
list[5].insertBefore(list[5].children[9], list[5].children[2]);
list[5].insertBefore(list[5].children[4], list[5].children[3]);
list[5].insertBefore(list[5].children[5], list[5].children[4]);
list[5].insertBefore(list[5].children[6], list[5].children[9]);
// 6)
const elemSix = document.createElement("li");
elemSix.textContent = "Глава 8: За пределами ES6";
list[2].insertAdjacentElement("beforeend", elemSix);
