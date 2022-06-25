import { Menu } from "./core/menu";
import { Module } from "./core/module";
import { ClicksModule } from "./modules/clicks.module";
import { randomSoundModule } from "./modules/sound.module";
import { TimerModule } from "./modules/timer.module";
import { customMessage } from "./modules/custom.message.module";
import { PresetTimerModule } from "./modules/presetTimer.module";
import { CustomTimerModule } from "./modules/customTimer.module";

export class ContextMenu extends Menu {
  constructor(selector) {
    super((selector = ".menu"));

    this.modules = [];

    this.add(
      new ClicksModule(),
      new TimerModule(),
      new randomSoundModule(),
      new customMessage(),
      new PresetTimerModule(),
      new CustomTimerModule()
    );

    if (this.modules.length)
      this.modules.forEach((module) => module.toHTML(this.el));

    document.body.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      this.el.style.top = `${event.clientY}px`;
      this.el.style.left = `${event.clientX}px`;

      this.open();
    });

    let isTriggered = false;

    this.el.addEventListener("click", (event) => {
      const { target } = event;

      for (const module of this.modules) {
        if (target.dataset.type === module.type) {
          if (!isTriggered) {
            module.trigger();
            isTriggered = true;
          }
        } else {
          Array.from(document.body.children).forEach((child) => {
            if (child.id !== "menu") child.remove();
          });
          isTriggered = false;
        }
        this.close();
      }
    });
  }

  open() {
    this.el.classList.add("open");
  }

  close() {
    if (this.el.classList.contains("open")) this.el.classList.remove("open");
  }

  add(modules) {
    if (!Array.isArray(modules)) modules = [...arguments];

    for (const module of modules) {
      if (!(module instanceof Module))
        throw new Error(
          "The module cannot be accepted as it is not an instance of class Module!"
        );
      this.modules.push(module);
    }
  }
}
