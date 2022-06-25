import '../utils/customTimer/css/customTimer.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {Starter} from '../utils/customTimer/js/HandleEventConroller/Starter'
import {Stopper} from '../utils/customTimer/js/HandleEventConroller/Stopper'
import {Resetter} from '../utils/customTimer/js/HandleEventConroller/Resetter'

export class CustomTimerModule extends Module {
    constructor(type, text) {
        super(type = 'customTimer', text = 'Кастомный таймер')
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
            text: 'Start',
            parent: btnBlock
        })
        const btnStop = new NodeCreator({
            tag: 'button',
            id: 'stop',
            type: 'button',
            text: 'Stop',
            parent: btnBlock
        })
        const btnReset = new NodeCreator({
            tag: 'button',
            id: 'reset',
            type: 'button',
            text: 'Reset',
            parent: btnBlock
        })

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