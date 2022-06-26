import { Module } from "../core/module";
import * as Tone from "tone";
import { random } from "../utils.js";

export class randomSoundModule extends Module {
  constructor(type, text) {
    super((type = "randomSound"), (text = "Случайный звук"));
  }
  trigger() {
    const notes = [
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
      "D5",
      "E5",
      "F5",
      "G5",
      "A5",
      "B5",
    ];
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(`${notes[random(0, notes.length - 1)]}`, "16n");
  }

  toHTML(parent) {
    parent.insertAdjacentHTML("beforeend", super.toHTML());
  }
}
