import {HandleEventController} from './HandleEventController'
import * as CommonVariables from '../commonVariables'

let {runningCounter} = CommonVariables

export class Stopper extends HandleEventController {
    click(evt) {
        clearInterval(runningCounter)
    }
}