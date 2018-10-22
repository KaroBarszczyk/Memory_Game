/***********************************************
           		CARDS
           Declare variables
 **********************************************/

let cardsDeck = document.querySelector(".deck");

//Create a list that holds all of your cards
let cardsAll = Array.from(document.querySelectorAll(".card"));

//Array with cards in one move
let cardsOpen = [];
//Aray with matched cards
let matchedCards = [];

let timerStarted = false;

let gameOn = false;

/***********************************************
           		GAME FUNCTION

 **********************************************/

let restartGame = document.querySelector(".restart");
let stars = document.querySelector(".stars");

// The restart button
restartGame.addEventListener("click", function(){
	location.reload();
});


//When the page loads, cards shuffle and the game begins
document.onload = startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function startGame(){
	//New cards deal
	gameOn = true;
	let newCardsAll = shuffle(cardsAll);
	
	cardsDeck.innerHTML = "";
	
	for (var i = 0; i < newCardsAll.length ; i++) {
		let singleCard = newCardsAll[i];
		singleCard.classList.remove("show", "open", "match");
		cardsDeck.appendChild(singleCard);
		//Checking if all cards are shuffled
		//singleCard.classList.add('show'); 

	}
	
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another 
 function that you call from this one)

*/
cardsDeck.addEventListener("click", function(event){
	//Only when event target is one of the <li> element
    if (event.target.nodeName === "LI"){
    	
    	if(timerStarted === false){
    		startTime();
    	}
    	    	
    	if((event.target.className !== "card open show")){
    		countingMoves();
    		event.target.classList.add("open", "show");
    		cardsOpen.push(event.target);
 	
	    	if((cardsOpen.length === 2) && (cardsOpen[0].innerHTML === cardsOpen[1].innerHTML)){
	    		markMatchingCards();
	    		if(matchedCards.length === 16){
	    			stopTime();
	    			winGame();
	    			gameOn = false;
	    		}
	    	}

	    	if ((cardsOpen.length === 2) && (cardsOpen[0].innerHTML !== cardsOpen[1].innerHTML)){
	    		flipCards();
	    	}
	
    	} 	
    	
    }
    		
 });




 //When two cards match
function markMatchingCards() {
	let firstCard = cardsOpen[0];
	let secondCard = cardsOpen[1];

    firstCard.classList.add("match");
    matchedCards.push(firstCard);
    secondCard.classList.add("match");
    matchedCards.push(secondCard);
    cardsOpen = [];
}


 //Flip cards when they don't match
function flipCards(){
	setTimeout(function(){
		cardsOpen[0].classList.remove("open", "show");
		cardsOpen[1].classList.remove("open", "show");
		cardsOpen.shift();
   		cardsOpen.shift();
	}, 300)

}


/***********************************************
           	SCORE PANEL AND MOVES
      
 **********************************************/
//Create a new span with the timer and add it to score panel, after stars
const panelScore = document.querySelector(".score-panel");
const timerSpan = document.createElement("span");

timerSpan.classList.add("timer");
timerSpan.textContent = "Time: 0 sec";

panelScore.appendChild(timerSpan);


//Function to count the time
let seconds = 0;
let minutes = 0;
let time;

function startTime() {
    timerStarted = true;
    time = setInterval(countTime, 1000);

    function countTime() {
    	if(seconds === 60){
    		minutes++;
    	}
    	else{
    		seconds ++;
    	}
        
        timerSpan.textContent = "Time: " + minutes + " min " + seconds + " sec";
    }
}


function stopTime(){
	let finalSeconds = seconds;
	let finalMinutes = minutes;
	timerSpan.textContent = "Time: " + finalMinutes + " min " + finalSeconds + " sec";
	clearInterval(time);

}

//Count moves and stars rating
const movesNumber = document.querySelector('.moves');
movesNumber.textContent = 0;

const starsSign = document.querySelector(".stars");
let starsNumber = 3;

let singleMove = 0;
let countMoves = 0;

function countingMoves() {
	if (gameOn === true){
		singleMove ++;
		//Conditional to increase number of moves only every second move
		if(singleMove % 2 === 0){
			countMoves ++;
			movesNumber.textContent = countMoves
		}
    	if(countMoves === 28){
	    	starsSign.firstElementChild.remove();
	    	starsNumber--
		    }
		if(countMoves === 45){
		    starsSign.firstElementChild.remove();
		    starsNumber--
		}
		if(countMoves === 85){
		   	starsSign.firstElementChild.remove();
		   	starsNumber--
		}
	} 
    
}


/***********************************************
           	   END OF GAME 

 **********************************************/

//Congratulations pop-up window when all the cards are matched

//Create the elements on the pop-up window with the result and ask about new game
const congratsWindow = document.createElement("div");
cardsDeck.appendChild(congratsWindow);
congratsWindow.classList.add("pop-window");

const paragraphCongrats = document.createElement("P");
const paragraphMoves = document.createElement("P");
const paragraphScore = document.createElement("P");
const paragraphTime = document.createElement("P");

congratsWindow.appendChild(paragraphCongrats);
congratsWindow.appendChild(paragraphMoves);
congratsWindow.appendChild(paragraphScore);
congratsWindow.appendChild(paragraphTime);

//Create a close sign
const closeSign = document.createElement("span");
closeSign.classList.add("close");
closeSign.textContent = "X";
congratsWindow.insertBefore(closeSign, paragraphCongrats);

closeSign.addEventListener("click", function () {
    congratsWindow.style.display = 'none';
})

function displayCongrats() {

    document.querySelector(".pop-window").style.display = "block";

	paragraphCongrats.textContent = "CONGRATULATIONS !!! YOU WON !!!"
	paragraphMoves.textContent = "You made " + countMoves + " moves." 
    paragraphScore.textContent = "Your star rating is: " + 
    							starsNumber + " stars.";
    paragraphTime.textContent = "Your total time is: " + minutes + 
    							" minutes "+ seconds + " seconds.";
    
}



function winGame(){
	displayCongrats();

}


//Another game button
const anotherGameButton = document.createElement("button");
anotherGameButton.textContent = "Another game";
congratsWindow.appendChild(anotherGameButton);

anotherGameButton.addEventListener("click", function(){
	location.reload();
	

});

