import '../utils/presetTimer/css/presetTimer.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {validateFormat} from '../utils/customTimer/js/validateFormat'
import {parseInput} from '../utils/presetTimer/js/parseInput'
import {validateInput} from '../utils/presetTimer/js/validateInput'

export class PresetTimerModule extends Module {
    constructor(type, text) {
        super(type = 'presetTimer', text = 'Таймер отсчёта')
    }

    trigger() {
        const presetTimerContainer = new NodeCreator({
            tag: 'div',
            id: 'presetTimerContainer',
            parent: document.body
        })
        const timer = new NodeCreator({
            tag: 'div',
            id: 'presetTimer',
            text: '00:00:00',
            parent: presetTimerContainer
        })

        let userInput

        do {
            userInput = prompt(`Задайте обратный отсчёт для таймера (формат МИН:СЕК) ?`, `00:00`).trim()
        } while (!validateInput(userInput))

        let [min, sec] = parseInput(userInput),
            ms = 99

        const countdownRunner = setInterval(fireCountdown, 1)

        function fireCountdown() {
            timer.textContent = `${validateFormat(min)}:${validateFormat(sec)}:${validateFormat(ms)}`

            ms--
            if (ms < 0) {
                ms = 99
                sec--
                if (sec < 0) {
                    sec = 59
                    min--
                    if (min < 0) {
                        if (!document.querySelector('#presetTimerContainer')) {
                            clearInterval(countdownRunner)
                        } else {
                            clearInterval(countdownRunner)
                            alert('Отсчёт окончен. Спасибо!')
                            presetTimerContainer.remove()
                        }
                    }
                }

            }
        }
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}