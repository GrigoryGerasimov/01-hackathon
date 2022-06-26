import {getCurrentTime} from './getCurrentTime'

export function renderCurrentTime(destinations) {
    if (!Array.isArray(destinations)) destinations = [...arguments]

    destinations.forEach(destination => {
        const intervalId = setInterval(() => {
            !document.querySelector(`#output-${destination}`) ? clearInterval(intervalId) : document.querySelector(`#output-${destination}`).textContent = getCurrentTime(destination)
        }, 1000)
    })
}