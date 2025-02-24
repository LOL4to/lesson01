"use strict";
const main = document.querySelector(".main");
const additional = document.querySelector(".additional");

const inputElem = document.createElement("input");
inputElem.className = "text-input";
inputElem.style.cssText =
  "color:rgb(50, 5, 18); width: 200px; height: 25px; font-size: 17px; padding: 3px; padding-left: 10px; margin-bottom: 10px; background-color: #fffbf3";
inputElem.placeholder = "Начать ввод с '.' или '#'";
inputElem.setAttribute("id", "idText");
main.append(inputElem);

const buttonElem = document.createElement("button");
buttonElem.className = "button-item";
buttonElem.style.cssText =
  "width: 140px; height: 35px; border-radius: 4%; font-size: 20px; margin-bottom: 8px";
buttonElem.textContent = "Нажать";
buttonElem.setAttribute("for", "idText");
main.append(buttonElem);

// .match(/(?<=\>)([^\<][\s\w]{1,})/gm)

//-------------------------------------------
//конструктор
const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  const element = ["0px", "opx"];
  this.element = element;
};

//метод для конструктора
DomElement.prototype.createElem = function () {
  const isCheck = function (elem) {
    return elem.trim().replace(/[.,!#]/g, ""); //удаляем символы перед текстом
  };
  const allStyles =
    "width: " +
    this.width +
    "; " +
    "height: " +
    this.height +
    "; " +
    "background: " +
    this.bg +
    "; " +
    "font-size: " +
    this.fontSize +
    "; ";
  let newElem = "";
  if (this.selector.charAt(0) === ".") {
    newElem = document.createElement("div");
    newElem.className = '"' + isCheck(this.selector) + '"';
    newElem.textContent = "Class " + '"' + isCheck(this.selector) + '"';
    newElem.style.cssText =
      allStyles +
      "margin-top: 15px; text-align:center; padding-top: 8px; border-radius: 4%;";
    main.append(newElem);
  }
  if (this.selector.charAt(0) === "#") {
    newElem = document.createElement("div");
    newElem.setAttribute("id", isCheck(this.selector));
    newElem.textContent = "id " + '"' + isCheck(this.selector) + '"';
    newElem.style.cssText =
      allStyles +
      "margin-top: 15px; text-align:center; padding-top: 8px; border-radius: 4%; ";
    main.append(newElem);
  }
};

const htmlElem = new DomElement(); //новый объект на основе конструктора

const callFunc = function () {
  htmlElem.selector = inputElem.value;
  htmlElem.width = prompt("width", "140px");
  htmlElem.height = prompt("height", "35px");
  htmlElem.bg = prompt("bg", "rgb(181, 139, 54)");
  htmlElem.fontSize = prompt("fontsize", "20px");
  htmlElem.createElem();
  clearFunc();
};

const clearFunc = function () {
  inputElem.value = "";
};

buttonElem.addEventListener("click", callFunc);

//----------------Additional homework
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");
  const square = new DomElement();
  square.width = "100px";
  square.height = "100px";
  square.bg = "lightgreen";
  square.element[0] = 400; //нач координаты квадрата
  square.element[1] = 300; //нач координаты квадрата
  square.newElement = document.createElement("div");

  DomElement.prototype.squareCreate = function () {
    this.newElement.style.cssText =
      "width: " +
      this.width +
      "; " +
      "height: " +
      this.height +
      "; " +
      "background: " +
      this.bg +
      "; " +
      "border: 1px solid black; position: absolute; ";
    this.newElement.style.top = parseInt(this.element[0]) + "px";
    this.newElement.style.left = parseInt(this.element[1]) + "px";
    console.log(this.element);
    document.body.append(this.newElement);
  };

  //событие при нажатии стрелок ►
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowUp":
        square.element[0] -= 10;
        break;
      case "ArrowDown":
        square.element[0] += 10;
        break;
      case "ArrowRight":
        square.element[1] += 10;
        break;
      case "ArrowLeft":
        square.element[1] -= 10;
        break;
      default:
        return;
    }
    square.squareCreate();
  });

  square.squareCreate();
});
