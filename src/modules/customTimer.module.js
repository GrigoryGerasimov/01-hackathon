import '../utils/customTimer/css/customTimer.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {validateFormat} from '../utils/customTimer/js/validateFormat'

export class CustomTimerModule extends Module {
    constructor(type, text) {
        super(type = 'customTimer', text = 'Секундомер')
    }

    trigger() {
        const customTimerContainer = new NodeCreator({
            tag: 'div',
            id: 'customTimerContainer',
            parent: document.body
        })
        const timerBlock = new NodeCreator({
            tag: 'div',
            classId: 'timer-block',
            parent: customTimerContainer
        })
        const timer = new NodeCreator({
            tag: 'div',
            id: 'timer',
            text: '00:00:00',
            parent: timerBlock
        })
        const btnBlock = new NodeCreator({
            tag: 'div',
            classId: 'btn-block',
            parent: customTimerContainer
        })
        const btnStart = new NodeCreator({
            tag: 'button',
            id: 'start',
            type: 'button',
            text: 'Старт',
            parent: btnBlock
        })
        const btnStop = new NodeCreator({
            tag: 'button',
            id: 'stop',
            type: 'button',
            text: 'Стоп',
            parent: btnBlock
        })
        const btnReset = new NodeCreator({
            tag: 'button',
            id: 'reset',
            type: 'button',
            text: 'Сброс',
            parent: btnBlock
        })

        let min = 0,
            sec = 0,
            ms = 0,
            runningCounter

        const setTimer = () => {
            timer.textContent = `${validateFormat(min)}:${validateFormat(sec)}:${validateFormat(ms)}`
            ms++
            if (ms > 99) {
                ms = 0
                sec++
                if (sec > 59) {
                    sec = 0
                    min++
                }
            }
        }

        class HandleEventController {
            handleEvent(evt) {
                this[evt.type](evt)
            }

            click(evt) {
            }
        }

        class Starter extends HandleEventController {
            constructor(button) {
                super()
                this.button = button
            }

            click(evt) {
                clearInterval(runningCounter)
                runningCounter = setInterval(setTimer, 1)
                this.button.textContent = 'Продолжить'
            }
        }

        class Stopper extends HandleEventController {
            click(evt) {
                clearInterval(runningCounter)
            }
        }

        class Resetter extends HandleEventController {
            click(evt) {
                timer.textContent = '00:00:00'
                btnStart.textContent = 'Старт'
                min = 0
                sec = 0
                ms = 0
            }
        }

        const starterHandler = new Starter(btnStart),
            stopperHandler = new Stopper(),
            resetterHandler = new Resetter()

        btnStart.addEventListener('click', starterHandler)
        btnStop.addEventListener('click', stopperHandler)
        btnReset.addEventListener('click', resetterHandler)
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}