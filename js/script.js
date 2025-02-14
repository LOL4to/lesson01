"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const headerButton = document.querySelector(".header-button");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  todoData.forEach(function (item, index) {
    //добав li после созд 'obj'а "newtodo" в 'arr'е "todoData"
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    //заносить в разные 'obj'ы 'arr'а "todoData" от условии
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    //переключ эл-та true/false по клику
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    //удал 'obj'а по клику "Корзина"
    li.querySelector(".todo-remove").addEventListener("click", function () {
      todoData.splice(index, 1);
      render();
      localStorage.setItem("todoData", JSON.stringify(todoData));
    });

    //заносить в localStorage все 'obj'ы с текущ arr'a
    localStorage.setItem("todoData", JSON.stringify(todoData));
  });
  console.log(todoData);
};

//созд obj "newTodo" в arr "todoData"
todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value.trim() != "") {
    const newTodo = {
      text: headerInput.value,
      completed: false,
    };
    todoData.push(newTodo);
    headerInput.value = "";
    render();
  }
});

//получаем 'arr' из localStorage в наш 'arr' todoData
//т.е. если todoData пуст, то нельзя запускать render()
if ((localStorage.getItem("todoData") !== null) & (todoData.length === 0)) {
  todoData = JSON.parse(localStorage.getItem("todoData"));
  render();
}
