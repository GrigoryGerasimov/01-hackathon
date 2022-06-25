import {setTimeFormat} from './setTimeFormat'

export const getCurrentTime = destinationTarget => {
    const destinationCatalog = {
        'lon': 1,
        'ber': 2,
        'mos': 3,
        'del': 5.5,
        'bei': 8,
        'tok': 9,
        'syd': 10,
        'was': -5,
        'ny': -4
    }

    return setTimeFormat(new Date(Date.now() + destinationCatalog[destinationTarget] * 60 * 60 * 1000))
}