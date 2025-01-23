"use strict";
let count;
let pcNumb = Math.ceil(Math.random() * 100);

function outerFunc() {
  const isNumber = function () {
    let num = prompt("Угадай число от 1 до 100", pcNumb);
    let boolVar = !isNaN(parseFloat(num) && isFinite(num));
    if (!num) {
      return alert("До встречи! (4^_^)");
    } else {
      switch (boolVar) {
        case true:
          return parseFloat(num);
        case false:
          alert("Введи число");
          return isNumber();
      }
    }
  };
  return isNumber;
}

const gameStart = function (myCount = 0, randomNumb) {
  const gameEndHappy = function () {
    if (confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?")) {
      myCount = 0;
      console.log("Погнали ещё раз!");
      return countFunc();
    } else {
      console.log("Ну пока!");
      alert("До встречи! (^_^)");
    }
  };
  const gameEndBad = function () {
    if (confirm("Попытки закончились, хотите сыграть еще?")) {
      myCount = 0;
      console.log("Погнали ещё раззз!");
      return countFunc();
    } else {
      console.log("Ну покааа!");
      return alert("До встречи! (^_^)");
    }
  };
  // ф-ция-счётчик + ф-ция вызывает саму себя, если попыток < 10
  function countFunc() {
    myCount++;
    const isNumber = outerFunc();
    let variable = isNumber();
    console.log(variable);
    // условия:
    if (myCount < 10) {
      if (variable > randomNumb) {
        console.log(
          "Загаданное число меньше, " +
            "осталось " +
            (10 - myCount) +
            " попыток"
        );
        return countFunc();
      } else if (variable < randomNumb) {
        console.log(
          "Загаданное число больше, " +
            "осталось " +
            (10 - myCount) +
            " попыток"
        );
        return countFunc();
      } else if (variable == randomNumb) {
        return gameEndHappy();
      }
    } else if (myCount >= 10) {
      return gameEndBad();
    }
  }
  countFunc();
};
//
gameStart(count, pcNumb);
