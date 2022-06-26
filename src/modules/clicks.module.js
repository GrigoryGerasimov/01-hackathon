import '../utils/clicks/css/clicks.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {validateFormat} from '../utils/customTimer/js/validateFormat'
import {renderResult} from '../utils/clicks/js/renderResult'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type = 'clickStatistics', text = 'Считать клики (за 30 секунд)')
    }

    trigger() {
        let singleClickCounter = 0,
            doubleClickCounter = 0,
            sec = 30,
            ms = 99

        const timerBlock = new NodeCreator({
            tag: 'div',
            classId: 'timer-block',
            text: `00:00`,
            parent: document.body
        })

        const countdownId = setInterval(fireCountdown, 1)

        captureClicks()

        function captureClicks() {
            document.body.addEventListener('click', () => {
                singleClickCounter++
            })
            document.body.addEventListener('dblclick', () => {
                doubleClickCounter++
            })
            document.body.addEventListener('selectstart', event => {
                event.preventDefault()
            })
        }

        function fireCountdown() {
            timerBlock.textContent = `${validateFormat(sec)}:${validateFormat(ms)}`

            ms--
            if (ms < 0) {
                ms = 99
                sec--
                if (sec < 0) {
                    clearInterval(countdownId)
                    renderResult(timerBlock, singleClickCounter, doubleClickCounter)
                }
            }
        }
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}