import { Module } from "../core/module";
import "../utils/pianoModule/pianoModule.css";
import * as Tone from "tone";
import { NodeCreator } from "../utils/NodeCreator/NodeCreator";

export class pianoModule extends Module {
  constructor(type, text) {
    super((type = "pianoModule"), (text = "Эмулятор пианино"));
  }
  trigger() {
    const notes = [
      "C4",
      "C#4",
      "D4",
      "D#4",
      "E4",
      "F4",
      "F#4",
      "G4",
      "G#4",
      "A4",
      "A#4",
      "B4",
      "C5",
    ];
    const userKeys = [
      "a",
      "w",
      "s",
      "e",
      "d",
      "f",
      "t",
      "g",
      "y",
      "h",
      "u",
      "j",
      "k",
    ];
    const keys = new NodeCreator({
      tag: "div",
      classId: "keys",
      parent: document.body,
    });
    for (let i = 0; i <= notes.length - 1; i++) {
      const key = new NodeCreator({
        tag: "div",
        classId: `${notes[i]} key ${userKeys[i]}`,
        text: userKeys[i],
        parent: keys,
      });
    }
    for (let key of document.querySelectorAll(".key")) {
      if (key.getAttribute("class").includes("#")) {
        key.classList.add(`${key.getAttribute("class")[0]}-sharp`);
      }
    }
    const synth = new Tone.Synth().toDestination();
    for (let j = 0; j <= userKeys.length - 1; j++) {
      document.addEventListener("keydown", (event) => {
        if (event.key === userKeys[j]) {
          synth.triggerAttackRelease(`${notes[j]}`, "16n");
          document.querySelector(`.${userKeys[j]}`).style.borderColor = "pink";
        } else {
          return;
        }
      });
      document.addEventListener("keyup", (event) => {
        document.querySelector(`.${userKeys[j]}`).style.borderColor = "black";
      });
    }
    const closeButton = new NodeCreator({
      tag: "button",
      classId: "close-button",
      parent: document.body,
      text: "Закрыть пианино",
    });
    //
    closeButton.addEventListener("click", (event) => {
      keys.remove(), closeButton.remove();
    });
  }

  toHTML(parent) {
    parent.insertAdjacentHTML("beforeend", super.toHTML());
  }
}
