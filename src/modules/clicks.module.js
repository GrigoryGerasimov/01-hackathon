import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type = 'clickStatistics', text = 'Считать клики (за 5 секунд)')
    }

    trigger() {}

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}