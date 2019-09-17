/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, input, winningScore, roundsc;

init();
var lastDice;

function diceRoll() {
  if (gamePlaying) {
    //1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    console.log(dice1, dice2);

    //2. display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //3. Update the round score IF the rolled number was not a 1

    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
      if (activePlayer == 1){
        // computer makes decision
        setTimeout(decision, 2000);
        // decision();
      }
    } else {
      //next player
      setTimeout(nextPlayer, 1000);
      }
    }
  };



function diceHold() {
  if (gamePlaying) {
    //add current score to global
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    //Ui input for final score
    input = document.querySelector(".final-score").value;
    console.log(input);
  
    // undefined, o , null or ""  COERCED to FALSE
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".btn-roll").style.visibility = 'hidden';
      document.querySelector(".cmp-roll").style.visibility = 'hidden';

      document.querySelector(".btn-hold").style.visibility = 'hidden';
      document.querySelector(".cmp-hold").style.visibility = 'hidden';
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
};
 
document.querySelector(".btn-roll").addEventListener("click", diceRoll);
document.querySelector(".btn-hold").addEventListener("click", diceHold);



// COMPUTER DECISION MAKING
function decision() {
  var finalscore = winningScore;
  console.log(roundsc, roundScore);
  roundsc = roundScore;
  // roundScore += roundsc;
  console.log(roundsc, '+', roundScore);
  if (scores[activePlayer] + roundScore < finalscore  ){
//IF ROUNDED SCORE + SCORE < UI INPUT/100 RUN

  // get a decision input
    var computedecision = Math.floor(Math.random() * 20) + 1;
    console.log(computedecision);

    if (computedecision % 3 == 0 || roundsc > (finalscore / 3) ) {
      // desision when computedecision is divvisible by 3
      if (computedecision % 3 == 0) { console.log('computerholdby 3'); }
      if (roundsc > (finalscore / 3)) { console.log(roundsc, '>', (finalscore / 3),'computerholdby rsc');}
      
      diceHold();
    } else {
      console.log('computerrolldecision')
      diceRoll();
    }
  }else{
    //IF ROUNDED SCORE + SCORE > UI INPUT/100 RUN  
    console.log('finaldecision')
    diceHold();
  } 
};

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".btn-roll").style.visibility = 'visible';
  document.querySelector(".cmp-roll").style.visibility = 'hidden';
  document.querySelector(".btn-hold").style.visibility = 'visible';
  document.querySelector(".cmp-hold").style.visibility = 'hidden';
  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-0-panel").classList.add("active");
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  if (activePlayer === 1) {
   roundsc = 0;
    //UI update
    document.querySelector(".btn-roll").style.visibility = 'hidden';
    document.querySelector(".cmp-roll").style.visibility = 'visible';
    document.querySelector(".btn-hold").style.visibility = 'hidden';
    document.querySelector(".cmp-hold").style.visibility = 'visible';
    // first decision
    console.log('computerfirstroll');
    setTimeout(diceRoll, 1000);
  };

}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "player-1";
  document.getElementById("name-1").textContent = "COMPUTER";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");


  document.querySelector(".btn-roll").style.visibility = 'visible';
  document.querySelector(".cmp-roll").style.visibility = 'hidden';

  document.querySelector(".btn-hold").style.visibility = 'visible';
  document.querySelector(".cmp-hold").style.visibility = 'hidden';
}

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
