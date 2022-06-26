import { Module } from "../core/module";
import { random } from "../utils";
import { colorRandom } from "../utils";

export class BlockRandomModule extends Module {
  constructor(type, text) {
    super((type = "createBlock"), (text = "Создать фигуру"));
  }
  trigger() {
    const block = document.createElement("div");
    if (event.target.dataset.type === "createBlock") {
      block.className = "randomBlock";
      block.style.width = random(1, 300) + "px";
      block.style.height = random(1, 300) + "px";
      block.style.borderRadius = random(10, 50) + "%";
      block.style.position = "absolute";
      block.style.background = colorRandom();
      block.style.top =
        random(
          1,
          document.documentElement.clientHeight - parseInt(block.style.height)
        ) + "px";
      block.style.left = random(1, 1920 - parseInt(block.style.width)) + "px";
      document.body.append(block);
    }
    const blockAll = document.querySelectorAll(".randomBlock");
    if (blockAll.length > 1) {
      blockAll[0].remove();
    } else {
    }
  }
  toHTML(parent) {
    parent.insertAdjacentHTML("beforeend", super.toHTML());
  }
}
