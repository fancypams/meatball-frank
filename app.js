const defaultCursor = document.querySelector('body')
const meatballCursor = document.querySelector('.meatball')
const hole = document.querySelectorAll('.hole')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')
let result = 0
let currentTime = timeLeft.textContent
var congrats = document.createElement("h2")

document.querySelector('.meatball').style.display = "none"

function changeCursor() {
    defaultCursor.setAttribute('style', 'cursor: none;')
    document.addEventListener('mousemove', e => {
        meatballCursor.setAttribute('style', 'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;')
    })
}

function playGame() {

    changeCursor()
    var btn = document.querySelector('.play-btn')
    btn.setAttribute('style', 'visibility: hidden;')

    function randomHole() {
        hole.forEach(className => {
            className.classList.remove('mole')
        })
        let randomPos = hole[Math.floor(Math.random() * 9)]
        randomPos.classList.add('mole')
        whackPos = randomPos.id
    }

    hole.forEach(id => {
        id.addEventListener('mousedown', () => {
            if (id.id === whackPos) {
                result = result + 1
                score.textContent = result
            }
        })
    })

    function moveMole() {
        let timerId = null
        timerId = setInterval(randomHole, 1000)
        setTimeout(function() { clearInterval(timerId); }, 60000);
    }

    function countDown() {
        currentTime--
        timeLeft.textContent = currentTime

        if (currentTime === 0) {
            clearInterval(timerId)
            defaultCursor.removeAttribute('style', 'cursor: none;')
            document.removeEventListener('mousemove', e => {
                meatballCursor.setAttribute('style', 'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;')
            })
        }
    }

    let timerId = setInterval(countDown, 1000)

    moveMole()

}