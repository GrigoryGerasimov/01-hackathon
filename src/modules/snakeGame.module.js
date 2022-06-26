import '../utils/snakeGame/css/snakeGame.css'
import {Module} from '../core/module'
import {NodeCreator} from '../utils/NodeCreator/NodeCreator'
import {isIdenticalTo} from '../utils/snakeGame/js/isIdenticalTo'

export class SnakeGame extends Module {
    constructor(type, text) {
        super(type = 'snakeGame', text = 'Игра Змейка')
    }

    trigger() {
        const containerBlock = new NodeCreator({
            tag: 'div',
            classId: 'container',
            id: 'container',
            parent: document.body
        })

        const viewScreenMain = new NodeCreator({
            tag: 'div',
            classId: 'viewscreen',
            parent: containerBlock
        })
        const viewScreenMainIntro = new NodeCreator({
            tag: 'h1',
            classId: 'title',
            text: 'Игра Змейка',
            parent: viewScreenMain
        })
        const gameStart = new NodeCreator({
            tag: 'a',
            classId: 'new-start',
            id: 'newstart',
            text: 'Начать новую игру',
            href: '#',
            parent: viewScreenMain
        })

        const viewScreenLevel = new NodeCreator({
            tag: 'div',
            classId: 'viewscreen',
            parent: containerBlock
        })
        const viewScreenLevelIntro = new NodeCreator({
            tag: 'h1',
            classId: 'title',
            text: 'Выберите Ваш уровень',
            parent: viewScreenLevel
        })

        const difficultyLevelBoxGroup = new NodeCreator({
            tag: 'div',
            classId: 'difficulty-level-box-group',
            id: 'difficulty-level-box-group',
            parent: viewScreenLevel
        })
        const viewScreenLevelDifficultyEasy = new NodeCreator({
            tag: 'div',
            classId: 'difficulty-level-box box-easy',
            intervalcounter: 1000,
            parent: difficultyLevelBoxGroup
        })
        const viewScreenLevelDifficultyEasyTitle = new NodeCreator({
            tag: 'a',
            href: '#',
            text: 'Новичок',
            parent: viewScreenLevelDifficultyEasy
        })

        const viewScreenLevelDifficultyMiddle = new NodeCreator({
            tag: 'div',
            classId: 'difficulty-level-box box-middle',
            intervalcounter: 500,
            parent: difficultyLevelBoxGroup
        })
        const viewScreenLevelDifficultyMiddleTitle = new NodeCreator({
            tag: 'a',
            href: '#',
            text: 'Продвинутый',
            parent: viewScreenLevelDifficultyMiddle
        })

        const viewScreenLevelDifficultyHard = new NodeCreator({
            tag: 'div',
            classId: 'difficulty-level-box box-hard',
            intervalcounter: 250,
            parent: difficultyLevelBoxGroup
        })
        const viewScreenLevelDifficultyHardTitle = new NodeCreator({
            tag: 'a',
            href: '#',
            text: 'Опытный',
            parent: viewScreenLevelDifficultyHard
        })

        const viewscreenBoard = new NodeCreator({
            tag: 'div',
            classId: 'viewscreen',
            parent: containerBlock
        })
        const viewScreenBoardTitle = new NodeCreator({
            tag: 'h1',
            classId: 'title gameboard-title',
            parent: viewscreenBoard
        })
        const scoreboard = new NodeCreator({
            tag: 'span',
            id: 'scoreboard',
            text: 'Счёт: ',
            parent: viewScreenBoardTitle
        })
        const scoreOutput = new NodeCreator({
            tag: 'output',
            id: 'score-output',
            text: '0',
            parent: scoreboard
        })

        const canvas = new NodeCreator({
            tag: 'canvas',
            classId: 'gameboard',
            id: 'gameboard',
            parent: viewscreenBoard
        })

        const flexiblePhraseArray = ['Ничего себе! Вот это результат!', 'Неплохо!', 'А ты действительно хорош', 'На первый раз сойдёт', 'Могло бы быть и лучше...'],
            canvasContext = canvas.getContext('2d'),
            canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            UNIT_DIMENSION = 3,

            gameOver = () => {
                clearInterval(intervalID)
                canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                canvas.style.display = 'none'
                const currentFlexiblePhrase = (score < 250)
                    ? `${flexiblePhraseArray[4]}` : (score < 600)
                        ? `${flexiblePhraseArray[3]}` : (score < 900)
                            ? `${flexiblePhraseArray[2]}` : (score < 1100)
                                ? `${flexiblePhraseArray[1]}` : `${flexiblePhraseArray[0]}`
                scoreboard.textContent = `Счёт: ${score} ! ${currentFlexiblePhrase}`
            }

        let score = 0,
            ms = 0,
            w_withinBlocks = canvasWidth / UNIT_DIMENSION,
            h_withinBlocks = canvasHeight / UNIT_DIMENSION,
            snake,
            apple,
            intervalID

        gameStart.addEventListener('click', (evt) => {
            evt.preventDefault()
            evt.stopPropagation()
            containerBlock.children[0].classList.add('upwards')
        })

        difficultyLevelBoxGroup.addEventListener('click', (evt) => {
            if (evt.target.parentNode.classList.contains('difficulty-level-box')) {
                ms = Number(evt.target.parentNode.dataset.intervalcounter)
                containerBlock.children[1].classList.add('upwards')
                startNewGame(ms)
            }
        }, true)

        if (!document.createElement('canvas').getContext('2d')) throw new Error('Упс! Похоже, что Ваш браузер не поддерживает canvas. Советуем Вам открыть данную игру на другом браузере.')

        class Snake {
            constructor(segmentArray) {
                this.snakeBody = segmentArray
                this.currentDir = this.furtherDir = 'ltr'
                this.color = "#fff"
                this.context = canvasContext
                this.crashFlag = false
            }

            depictCorpse() {
                this.snakeBody.forEach(bodyElement => {
                    this.context.fillStyle = this.color
                    this.context.shadowBlur = 10
                    this.context.shadowColor = this.color
                    this.context.fillRect(bodyElement.coordX * UNIT_DIMENSION, bodyElement.coordY * UNIT_DIMENSION, UNIT_DIMENSION, UNIT_DIMENSION)
                })
            }

            moveCorpse() {
                this.currentDir = this.furtherDir
                switch (this.currentDir) {
                    case null:
                        return
                    case 'ltr':
                        this.snakeBody.unshift({
                            coordX: this.snakeBody[0].coordX + 1,
                            coordY: this.snakeBody[0].coordY
                        })
                        break;
                    case 'utd':
                        this.snakeBody.unshift({
                            coordX: this.snakeBody[0].coordX,
                            coordY: this.snakeBody[0].coordY + 1
                        })
                        break;
                    case 'rtl':
                        this.snakeBody.unshift({
                            coordX: this.snakeBody[0].coordX - 1,
                            coordY: this.snakeBody[0].coordY
                        })
                        break;
                    case 'dtu':
                        this.snakeBody.unshift({
                            coordX: this.snakeBody[0].coordX,
                            coordY: this.snakeBody[0].coordY - 1
                        })
                        break;
                }

                if (this.isSnakeCrash()) gameOver()

                if (isIdenticalTo(this.snakeBody[0], apple)) {
                    score += 50
                    ms -= 5
                    startNewGame(ms)
                    scoreOutput.textContent = score
                    apple.generateNewUnit()
                } else {
                    this.snakeBody.pop()
                }
            }

            isSnakeCrash() {
                this.crashOnThreshold = (this.snakeBody[0].coordX < 0 || this.snakeBody[0].coordX > w_withinBlocks - 1 || this.snakeBody[0].coordY < 0 || this.snakeBody[0].coordY > h_withinBlocks - 1)
                for (let snakeCorpseIndex = 1; snakeCorpseIndex < this.snakeBody.length; snakeCorpseIndex++) {
                    if (isIdenticalTo(this.snakeBody[0], this.snakeBody[snakeCorpseIndex])) {
                        this.crashOnOwnCorpse = true
                    }
                }
                this.crashFlag = this.crashOnThreshold || this.crashOnOwnCorpse
                return this.crashFlag
            }

            defineFurtherDirection(newDirection) {
                this.furtherDir = (this.currentDir === newDirection.split('').reverse().join('')) ? null : newDirection
            }
        }

        class Apple {
            constructor(objectCoords) {
                this.newAppleUnit = Object.assign(this, objectCoords)
                this.coordCenterX = this.coordX * UNIT_DIMENSION + UNIT_DIMENSION / 2
                this.coordCenterY = this.coordY * UNIT_DIMENSION + UNIT_DIMENSION / 2
                this.context = canvasContext
                this.color = 'darkorange'
            }

            depictUnit() {
                this.context.beginPath()
                this.context.fillStyle = this.color
                this.context.shadowBlur = 10
                this.context.shadowColor = this.color
                this.context.arc(this.coordCenterX, this.coordCenterY, UNIT_DIMENSION / 2, 0, Math.PI * 2, false)
                this.context.fill()
            }

            generateNewUnit() {
                this.newAppleUnit = Object.assign(this, new Apple({
                    coordX: Math.floor(Math.random() * (w_withinBlocks - 2) + 1),
                    coordY: Math.floor(Math.random() * (h_withinBlocks - 2) + 1)
                }))
            }
        }

        snake = new Snake([{coordX: 6, coordY: 5}, {coordX: 5, coordY: 5}])
        apple = new Apple({
            coordX: Math.floor(Math.random() * (w_withinBlocks - 2) + 1),
            coordY: Math.floor(Math.random() * (h_withinBlocks - 2) + 1)
        })

        const startNewGame = (ms) => {
            intervalID = setInterval(() => {
                canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                snake.depictCorpse()
                snake.moveCorpse()
                apple.depictUnit()
            }, ms)
        }

        document.body.addEventListener('keydown', evt => {
            switch (evt.key) {
                case 'ArrowLeft':
                    snake.defineFurtherDirection('rtl')
                    break;
                case 'ArrowRight':
                    snake.defineFurtherDirection('ltr')
                    break;
                case 'ArrowUp':
                    snake.defineFurtherDirection('dtu')
                    break;
                case 'ArrowDown':
                    snake.defineFurtherDirection('utd')
                    break;
            }
        })
    }

    toHTML(parent) {
        parent.insertAdjacentHTML('beforeend', super.toHTML())
    }
}