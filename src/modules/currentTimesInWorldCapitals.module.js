import '../utils/currentTimeInWorldCapitals/css/currentTimeInWorldCapitals.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {renderCurrentTime} from '../utils/currentTimeInWorldCapitals/js/renderCurrentTime'

export class currentTimeInWorldCapitals extends Module {
    constructor(type, text) {
        super(type = 'currentTimeInWorldCapitals', text = 'Текущее время в мировых столицах')
    }

    trigger() {
        const mainContainer = new NodeCreator({
            tag: 'div',
            id: 'main-container',
            parent: document.body
        })

        const londonBlock = new NodeCreator({
            tag: 'article',
            id: 'london',
            parent: mainContainer
        })
        const londonTitle = new NodeCreator({
            tag: 'span',
            text: 'London',
            parent: londonBlock
        })
        const londonOutput = new NodeCreator({
            tag: 'article',
            id: 'output-lon',
            parent: londonBlock
        })


        const berlinBlock = new NodeCreator({
            tag: 'article',
            id: 'berlin',
            parent: mainContainer
        })
        const berlinTitle = new NodeCreator({
            tag: 'span',
            text: 'Berlin',
            parent: berlinBlock
        })
        const berlinOutput = new NodeCreator({
            tag: 'article',
            id: 'output-ber',
            parent: berlinBlock
        })


        const moscowBlock = new NodeCreator({
            tag: 'article',
            id: 'moscow',
            parent: mainContainer
        })
        const moscowTitle = new NodeCreator({
            tag: 'span',
            text: 'Moscow',
            parent: moscowBlock
        })
        const moscowOutput = new NodeCreator({
            tag: 'article',
            id: 'output-mos',
            parent: moscowBlock
        })

        const delhiBlock = new NodeCreator({
            tag: 'article',
            id: 'delhi',
            parent: mainContainer
        })
        const delhiTitle = new NodeCreator({
            tag: 'span',
            text: 'Delhi',
            parent: delhiBlock
        })
        const delhiOutput = new NodeCreator({
            tag: 'article',
            id: 'output-del',
            parent: delhiBlock
        })

        const beijingBlock = new NodeCreator({
            tag: 'article',
            id: 'beijing',
            parent: mainContainer
        })
        const beijingTitle = new NodeCreator({
            tag: 'span',
            text: 'Beijing',
            parent: beijingBlock
        })
        const beijingOutput = new NodeCreator({
            tag: 'article',
            id: 'output-bei',
            parent: beijingBlock
        })

        const tokioBlock = new NodeCreator({
            tag: 'article',
            id: 'tokio',
            parent: mainContainer
        })
        const tokioTitle = new NodeCreator({
            tag: 'span',
            text: 'Tokio',
            parent: tokioBlock
        })
        const tokioOutput = new NodeCreator({
            tag: 'article',
            id: 'output-tok',
            parent: tokioBlock
        })

        const sydneyBlock = new NodeCreator({
            tag: 'article',
            id: 'sydney',
            parent: mainContainer
        })
        const sydneyTitle = new NodeCreator({
            tag: 'span',
            text: 'Sydney',
            parent: sydneyBlock
        })
        const sydneyOutput = new NodeCreator({
            tag: 'article',
            id: 'output-syd',
            parent: sydneyBlock
        })

        const washingtonBlock = new NodeCreator({
            tag: 'article',
            id: 'washington',
            parent: mainContainer
        })
        const washingtonTitle = new NodeCreator({
            tag: 'span',
            text: 'Washington',
            parent: washingtonBlock
        })
        const washingtonOutput = new NodeCreator({
            tag: 'article',
            id: 'output-was',
            parent: washingtonBlock
        })

        const newyorkBlock = new NodeCreator({
            tag: 'article',
            id: 'newyork',
            parent: mainContainer
        })
        const newyorkTitle = new NodeCreator({
            tag: 'span',
            text: 'New York',
            parent: newyorkBlock
        })
        const newyorkOutput = new NodeCreator({
            tag: 'article',
            id: 'output-ny',
            parent: newyorkBlock
        })

        renderCurrentTime(['lon', 'ber', 'mos', 'del', 'bei', 'tok', 'syd', 'was', 'ny'])
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}