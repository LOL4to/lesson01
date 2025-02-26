"use strict";
class First {
  constructor(name) {
    this.name = name;
  }
  hello1(name) {
    console.log(`Привет я ${this.name} родителя!`);
  }
}

class Second extends First {
  constructor(name) {
    super(name);
  }
  hello2() {
    super.hello1();
    console.log(`А я наследуемый ${this.name}!`);
  }
}
const myVar = new Second("метод");

console.log(myVar);
myVar.hello2();
