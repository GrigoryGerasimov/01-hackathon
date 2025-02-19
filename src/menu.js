import { getMenuSize } from "./utils";
import { Menu } from "./core/menu";
import { Module } from "./core/module";
import { ClicksModule } from "./modules/clicks.module";
import { randomSoundModule } from "./modules/sound.module";
import { customMessage } from "./modules/custom.message.module";
import { PresetTimerModule } from "./modules/presetTimer.module";
import { CustomTimerModule } from "./modules/customTimer.module";
import { pianoModule } from "./modules/piano.module";
import { currentTimeInWorldCapitals } from "@/modules/currentTimesInWorldCapitals.module";
import { BlockRandomModule } from "./modules/randomFigure.module";
import { SnakeGame } from './modules/snakeGame.module'
import { DailyQuotesModule } from './modules/dailyQuotes.module'
import { ColorChange } from './modules/colorChange.module'


export class ContextMenu extends Menu {
  constructor(selector) {
    super((selector = ".menu"));

    this.modules = [];

    this.add(
      new ClicksModule(),
      new randomSoundModule(),
      new customMessage(),
      new PresetTimerModule(),
      new CustomTimerModule(),
      new pianoModule(),
      new currentTimeInWorldCapitals(),
      new BlockRandomModule(),
        new SnakeGame(),
        new DailyQuotesModule(),
        new ColorChange()
    );

    if (this.modules.length)
      this.modules.forEach((module) => module.toHTML(this.el));

    document.body.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const contextmenuWidth = getMenuSize(this.el, 'width', 150),
          contextmenuHeight = getMenuSize(this.el, 'height', 500)

      this.el.style.left = ((document.documentElement.clientWidth - event.clientX) < contextmenuWidth) ?
          `${document.documentElement.clientWidth - contextmenuWidth}px` : `${event.clientX}px`

      this.el.style.top = ((document.documentElement.clientHeight - event.clientY) < contextmenuHeight) ?
          `${document.documentElement.clientHeight - contextmenuHeight}px` : `${event.clientY}px`

      this.open();
    });

    let isTriggered = false;

    this.el.addEventListener("click", (event) => {
      const { target } = event;

      for (const module of this.modules) {
        if (target.dataset.type === module.type) {
          if (!isTriggered) {
            Array.from(document.body.children).forEach((child) => {
              if (child.id !== "menu") child.remove();
            });
            module.trigger();
            isTriggered = true;
          }
        } else {
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
    this.close();
  }
}
