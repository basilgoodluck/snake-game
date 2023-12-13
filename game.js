import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection} from "./snake.js"
const gameBoard = document.getElementById("gameBoard")
import { update as updateFood, draw as drawFood} from "./food.js"
import { outsideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false

function main (currentTime){
    if (gameOver){
        if(confirm("You lose, press ok to continue")){
            window.location = "/"
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log("render")
    lastRenderTime = currentTime
    
    draw()
    update()
}
window.requestAnimationFrame(main)

function update (){
    updateSnake()
    updateFood()
    checkDeath()
}
function draw (){
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath () {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}