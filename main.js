let random = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#submit");
const user_input = document.querySelector("#guessFeild");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastresult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".results");

const para = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;


if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(user_input.value);
        console.log(guess);
        validateGuess(guess);

    })
    user_input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent default behavior (form submission)
          const guess = parseInt(user_input.value);
          console.log(guess);
          validateGuess(guess);
        }
      });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please enter a valid Number");
    }else if(guess<1){
        alert("Please enter number greater than 1 ")
    }else if(guess>100){
        alert("Please enter a nuber less than 100");
    }else{
        prevGuess.push(guess);
        if(numGuess===11){
            displayGuess(guess);
            displayMessage(`Game over, Random Number was ${random}`)
            endGame();
        }else{
            displayGuess(guess);
            check(guess);
        }
    }


}

function check(guess){
  if(guess === random){
    displayMessage(`You guessed it right!`);
  }else if(guess< random){
    displayMessage(`The guesss is tooo low`);
  }else if(guess>random){
    displayMessage(`The guess is tooo High`);
  }
}

function displayGuess(guess){
    user_input.value = "";
    guessSlot.innerHTML += `${guess}  `
    numGuess++;
    remaining.innerHTML = `${numGuess > 10 ? 0 : 11 - numGuess}`; 
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2 class = " font-bold text-xl text-black">${message}</h2>`

}

function endGame(){
    user_input.value='';
    user_input.setAttribute('disabled', '');
    para.classList.add('button');
    para.innerHTML = `<button id = "newGame"  class = " mx-auto mt-6  h-8 w-48 bg-black text-white">Start New Game</button>`;
    startOver.appendChild(para);
    playGame = false;
    newGame();
}

function newGame(){
    const NewGame = document.querySelector(`#newGame`);
    NewGame.addEventListener('click', function(e){
        random = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11-numGuess}`;
        user_input.removeAttribute('disabled')
        startOver.removeChild(para);
        playGame = true;

    })
}