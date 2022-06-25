import {Menu} from './core/menu'
import {Module} from './core/module'
import {ClicksModule} from './modules/clicks.module'
import {TimerModule} from './modules/timer.module'

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector = '.menu')

        this.modules = []

        this.add(new ClicksModule(), new TimerModule())

        if (this.modules.length) this.modules.forEach(module => module.toHTML(this.el))

        document.body.addEventListener('contextmenu', event => {
            event.preventDefault()

            this.el.style.top = `${event.clientY}px`
            this.el.style.left = `${event.clientX}px`

            this.open()
        })

        this.el.addEventListener('click', event => {
            const {target} = event

            for (const module of this.modules) {
                if (target.dataset.type === module.type) module.trigger()
                this.close()
            }
        })
    }

    open() {
        this.el.classList.add('open')
    }

    close() {
        if (this.el.classList.contains('open')) this.el.classList.remove('open')
    }

    add(modules) {
        if (!Array.isArray(modules)) modules = [...arguments]

        for (const module of modules) {
            if (!(module instanceof Module)) throw new Error('The module cannot be accepted as it is not an instance of class Module!')
            this.modules.push(module)
        }
    }
}