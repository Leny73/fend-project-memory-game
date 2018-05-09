/*
 * Create a list that holds all of your cards
 *
 */
let listArray = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
  ];
  let movesList = [];
  let openList = [];
  let matches = 0;
  let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function shuffleCards(){
let shuffledCards = shuffle(listArray);

$(".deck").children().remove();

for(let i = 0;i<shuffledCards.length;i++){
    let cardContainer = document.createElement("li");
    cardContainer.setAttribute("id",i);
    $(cardContainer).addClass("card");
    let cardType = document.createElement("i");
    $(cardType).addClass(shuffledCards[i]);
    cardContainer.appendChild(cardType);
    const cardSelector = document.querySelector(".deck");
    cardSelector.appendChild(cardContainer);
}
/**Adding the shuffled cards to the page */
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$(".restart").on('click',function(evt){
    evt.preventDefault();
    shuffleCards();
    document.getElementById("moves").innerHTML = 0 + " Moves";
    document.getElementById("myModal").innerHtml = "";
});

shuffleCards();
$(".card").on('click',function(event){
    event.preventDefault();
    show($(this));
    addToListOfCards($(this));
    compare($(this));
    move($(this));
    display();
});
/**Displays the card symbol */
function show(evt){
    evt.addClass("open show");
}
/**toggles the classes and puts a match class on the card*/
function match(evt){ 
    evt.toggleClass("open show");
    evt.addClass("match");
}
/** hides the pictures with a set delay */
function hide(evt){
    setTimeout(function(){
        evt.delay(10000).removeClass("open show");
    },1000);
}
/**Adss the cards to an array  */
function addToListOfCards(evt){
    openList.push(evt); 
}
/**Compares the cards to check if they're matching */
function compare(evt){
    if(openList.length === 2) {
        moves++;
        firstMatch = openList[0].children().attr("class");
        secondMatch = openList[1].children().attr("class");
        if(firstMatch === secondMatch){
            match(openList[0]);
            match(openList[1]);
            matches++;
            console.log(matches);
            openList = [];
        }else {
            hide(openList[0]);
            hide(openList[1]);
            openList = []

        }
   }  
}
/** Displays the number of moves */
function move(evt){
    if(moves ===1 ){
        document.getElementById("moves").innerHTML = moves + " Move";
    }else {
        document.getElementById("moves").innerHTML = moves + " Moves";
    }
}
function display(){
    let modalContainer = document.createElement("div");
    modalContainer.setAttribute("id","myModal");
    $(modalContainer).addClass("modal");
    const selector = document.querySelector("#modalMessage");
    selector.appendChild(modalContainer);
    if(matches ===8){
        console.log('game finishes');
        document.getElementById("myModal").innerHTML="Congratulations you've finished the game with " + moves + "moves";
    }
}