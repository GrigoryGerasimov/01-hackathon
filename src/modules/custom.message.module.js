import { Module } from "../core/module";

export class customMessage extends Module {
  constructor(type, text) {
    super((type = "customeMessage"), (text = "Кастомное сообщение"));
  }
  trigger() {
    const message = document.createElement("div");
    message.classList.add("message");

    const date = `${new Date().getHours()}:${new Date().getMinutes()}`;
    message.textContent = `Время: ${date}`;
    document.body.append(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  }

  toHTML(parent) {
    parent.insertAdjacentHTML("beforeend", super.toHTML());
  }
}
