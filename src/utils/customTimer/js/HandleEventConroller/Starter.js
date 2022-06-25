import {HandleEventController} from './HandleEventController'
import * as CommonVariables from '../commonVariables'

let {runningCounter} = CommonVariables

export class Starter extends HandleEventController {
    constructor(button) {
        super()
        this.button = button
    }

    click(evt) {
        clearInterval(runningCounter)
        runningCounter = setInterval(setTimer, 1)
        this.button.textContent = 'Resume'
    }
}