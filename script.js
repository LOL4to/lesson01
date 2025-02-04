const btnText = document.getElementById("btn");
const inptText = document.querySelectorAll("input[type='text']");
const square = document.getElementById("square");

//1)
const btnTextFunc = function () {
  square.style.backgroundColor = inptText[0].value;
  inptText[0].value = null;
};

btnText.addEventListener("click", btnTextFunc);
//2)
const btnHid = document.getElementById("e_btn");
btnHid.style.display = "none";

//3) Изменяем шир. и выс. круга в завис. от знач. input ползунка
const inptRange = document.querySelector("#range");
const spanRange = document.querySelector("#range-span");
const circleRange = document.querySelector("#circle");

const rangeFunc = function (event) {
  spanRange.textContent = event.target.value;
  circleRange.style.width = +event.target.value + "%";
  circleRange.style.height = +event.target.value + "%";
};
inptRange.addEventListener("input", rangeFunc);
