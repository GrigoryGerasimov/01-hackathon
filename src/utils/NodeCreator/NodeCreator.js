export class NodeCreator {
    constructor(data) {
        const {tag, classId, id, type, href, intervalcounter, text, parent} = data
        Object.assign(this, {tag, classId, id, type, href, intervalcounter, text, parent})
        return this.create()
    }

    create() {
        const node = document.createElement(this.tag)
        this.validateProps(node, 'class', this.classId)
        this.validateProps(node, 'id', this.id)
        this.validateProps(node, 'type', this.type)
        this.validateProps(node, 'href', this.href)
        this.validateProps(node, 'data-intervalcounter', this.intervalcounter)
        node.textContent = (this.text) ? this.text : ''

        this.parent.append(node)
        return node
    }

    validateProps(elem, name, prop) {
        if (prop) elem.setAttribute(name, prop)
    }

}