import "../utils/colorChange/css/colorChange.css";
import { Module } from "../core/module";

export class ColorChange extends Module {
    constructor(type, text) {
        super((type = "ColorChange"), (text = "Случайный цвет"));
    }
    trigger() {
        function getRandomColor() {
            const colorsList = [
                "red",
                "green",
                "yellow",
                "orange",
                "skyblue",
                "lightpink",
                "hotpink",
                "grey",
                "black",
            ];
            const randomNum = Math.ceil(Math.random() * colorsList.length);
            document.body.style.backgroundColor = colorsList[randomNum];
        }

        function initApp() {
            const button = document.createElement("button");
            button.className = "button";
            button.textContent = "Изменить цвет страницы";
            document.body.append(button);
            button.addEventListener("click", getRandomColor);
        }
        initApp();
    }

    toHTML(parent) {
        parent.insertAdjacentHTML("beforeend", super.toHTML());
    }
}