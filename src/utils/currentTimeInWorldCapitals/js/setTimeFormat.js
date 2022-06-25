import {validateFormat} from '../../../utils/customTimer/js/validateFormat';

export const setTimeFormat = date => `${validateFormat(date.getUTCHours())}:${validateFormat(date.getUTCMinutes())}:${validateFormat(date.getUTCSeconds())}`