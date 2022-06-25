import {Module} from '../core/module'

export class TimerModule extends Module {
    constructor(type, text) {
        super(type = 'timer', text = 'Таймер отсчёта')
    }

    trigger() {}

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}