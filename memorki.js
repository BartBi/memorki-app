
// Classes(COLORS) Array

// let cardsColor = ["tomato", "tomato", "orange", "orange", "dodgerBlue", "dodgerBlue", "gray", "gray", "mediumSeaGreen", "mediumSeaGreen", "slateBlue", "slateBlue", "violet", "violet", "olive", "olive", "navy", "navy", "brown", "brown", "peachpuff", "peachpuff", "yellow", "yellow"];

// Cards selected with made array

let cards = document.querySelectorAll(".off");

cards = [...cards]; // Here change selected div nodes to array with spread operator cause this is an kind of array but its actually not; 


// TIME STUFF
let startTime = new Date().getTime()
// console.log(startTime) / 10000
let gameTime = 0;
let endTime = 0;
let tenMilliseconds = 0;
let seconds = 0;
let minutes = 0;
let displayTimer = document.querySelector(".stop-watch");
let interwalStopwatch = "";

//  CARDS \ PAIRS THINGS 
let activeCard = "";
let activeCards = [];
const pairs = cards.length / 2;
let countWonPairs = 0;

// COUNT-CLICK FOR START BUTTON
let countStartClicked = 0;


// MINI GAME
const spk = function () {
    activeCard = this;
    activeCard.classList.remove("hidden");
    activeCards.push(activeCard)


    // Same button twice cheat block 
    if (activeCards.length === 1) {
        activeCards[0].removeEventListener('click', spk);
        activeCard = "";
        return
    }

    //  Won pair 
    if (activeCards.length === 2 && activeCards[0].className == activeCards[1].className) {
        activeCards[0].classList.add("off");
        activeCards[0].removeEventListener('click', spk)
        activeCards[1].classList.add("off");
        activeCards[1].removeEventListener('click', spk)
        countWonPairs++;
        activeCards = [];

        if (countWonPairs === pairs) {
            window.clearInterval(interwalStopwatch);
        }
        setTimeout(function () { countWonPairs === pairs ? displayTimer.classList.remove('off_2') : false }, 200);
    }

    // When two colors don't match
    if (activeCards.length === 2 && activeCards[0].className !== activeCards[1].className) {
        cards.forEach(card => card.removeEventListener("click", spk));
        setTimeout(() => {
            activeCards[0].classList.add("hidden")
            activeCards[1].classList.add("hidden")
            cards.forEach(card => card.addEventListener("click", spk));
            activeCards = []
        }, 400);

    }

}


// FUNCTION INIT 
const init = function () {

    let cardsColor = ["tomato", "tomato", "orange", "orange", "dodgerBlue", "dodgerBlue", "gray", "gray", "mediumSeaGreen", "mediumSeaGreen", "slateBlue", "slateBlue", "violet", "violet", "olive", "olive", "navy", "navy", "brown", "brown", "peachpuff", "peachpuff", "yellow", "yellow"];

    cards.forEach(function (card) {
        card.classList = "";
        let position = "";
        position = Math.floor(Math.random() * cardsColor.length)

        card.classList.add(cardsColor[position])
        cardsColor.splice(position, 1);
        card.classList.add("hidden");
        card.addEventListener('click', spk);
    })

}


// Stopwatch section
const stopWatch = () => {
    ++tenMilliseconds

    if (tenMilliseconds / 100 === 1) {

        tenMilliseconds = 0;
        seconds++
    }
    if(seconds/60 ===1){
    seconds = 0 ;
    minutes++
    }

    displayTimer.innerText = `${minutes}:${seconds}:${tenMilliseconds}`;
}




// Slecet Start & Reset Buttons,


const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener('click', () => {
    // activeCards = [];
    // countWonPairs = 0;
    // startTime = new Date().getTime()
    // init();
    // tenMilliseconds = 0;
    // seconds = 0;
    location.reload();

})



startButton.addEventListener("click", initAndCount = () => {
    init()
    countStartClicked++
    if (countStartClicked > 0) {
        startButton.removeEventListener('click',initAndCount)
        startButton.classList.add("off");
    }

    interwalStopwatch = window.setInterval(stopWatch, 10)
    setTimeout(() => {

        displayTimer.classList.add('off_2');

    }
        , 600)
}
);

