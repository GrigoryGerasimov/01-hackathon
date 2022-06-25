import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {validateFormat} from '../utils/customTimer/js/validateFormat'

export class PresetTimerModule extends Module {
    constructor(type, text) {
        super(type = 'presetTimer', text = 'Таймер отсчёта')
    }

    trigger() {
        const presetTimerContainer = new NodeCreator({
            tag: 'div',
            id: 'presentTimerContainer',
            parent: document.body
        })
        const timer = new NodeCreator({
            tag: 'div',
            id: 'presetTimer',
            text: '00:00:00',
            parent: presetTimerContainer
        })

        const userInput = prompt(`На какое время Вы хотите поставить отсчёт таймера (формат 'мин:сек') ?`, `00:00`)

        const parseInput = requestedTime => requestedTime.split(':').map(Number)

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
                        clearInterval(countdownRunner)
                        alert('Timer is over!')
                        presetTimerContainer.remove()
                    }
                }

            }
        }
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}