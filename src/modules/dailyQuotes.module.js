import '../utils/dailyQuotes/css/dailyQuotes.css'
import {random} from '../utils'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'


export class DailyQuotesModule extends Module {
    constructor(type, text) {
        super(type = 'dailyQuotes', text = 'Цитаты на каждый день')
    }

    trigger() {
        const genContainer = new NodeCreator({
            tag: 'div',
            id: 'gen-container',
            parent: document.body
        })
        const postContainer = new NodeCreator({
            tag: 'article',
            classId: 'square',
            id: 'post-container',
            parent: genContainer
        })
        const postTitle = new NodeCreator({
            tag: 'h5',
            text: 'Умная цитата на каждый день',
            parent: postContainer
        })


        const commentsContainer = new NodeCreator({
            tag: 'article',
            classId: 'comments',
            id: 'comments-container',
            parent: genContainer
        })
        const commentTitle = new NodeCreator({
            tag: 'h5',
            classId: 'comment-title',
            text: 'Цитата от наших подписчиков',
            parent: commentsContainer
        })
        const commentPhoto = new NodeCreator({
            tag: 'figure',
            classId: 'comment-photo',
            parent: commentTitle
        })

        const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts',
            URL_COMMENTS = 'https://jsonplaceholder.typicode.com/comments',
            URL_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

        fetch(URL_POSTS)
            .then(response => response.json())
            .then(result => {
                const randomKey = random(0, 100)
                postContainer.insertAdjacentHTML('beforeend', `<blockquote>${result[randomKey].title}, ${result[randomKey].body}</blockquote>`)
            })

        fetch(URL_COMMENTS)
            .then(response => response.json())
            .then(result => {
                const randomKey = random(0, 100)
                commentsContainer.insertAdjacentHTML('beforeend', `<pre>${result[randomKey].body}</pre><cite>${result[randomKey].name}, (${result[randomKey].email})</cite>`)
            })

        fetch(URL_PHOTOS)
            .then(response => response.json())
            .then(result => {
                const randomKey = random(0, 500)
                new NodeCreator({
                    tag: 'img',
                    src: result[randomKey].thumbnailUrl,
                    parent: commentPhoto
                })
            })
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}