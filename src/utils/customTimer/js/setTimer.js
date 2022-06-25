import {validateFormat} from '../utils/customTimer/js/validateFormat'
import * as CommonVariables from '../utils/customTimer/js/commonVariables'

let {min, sec, ms} = CommonVariables

export function setTimer() {
    document.querySelector('#timer').textContent = `${validateFormat(min)}:${validateFormat(sec)}:${validateFormat(ms)}`
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