import {HandleEventController} from './HandleEventController'
import * as CommonVariables from '../commonVariables'

let {min, sec, ms} = CommonVariables

export class Resetter extends HandleEventController {
    click(evt) {
        document.querySelector('#timer').textContent = '00:00:00'
        document.querySelector('#start').textContent = 'Start'
        min = 0
        sec = 0
        ms = 0
    }
}