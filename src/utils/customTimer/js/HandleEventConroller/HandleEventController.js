export class HandleEventController {
    handleEvent(evt) {
        this[evt.type](evt)
    }

    click(evt) {
    }
}