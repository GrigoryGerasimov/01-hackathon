import {Module} from '../core/module'

export class PresetTimerModule extends Module {
    constructor(type, text) {
        super(type = 'presetTimer', text = 'Таймер отсчёта')
    }

    trigger() {

    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}