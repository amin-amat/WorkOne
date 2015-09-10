// ESTABLISHING SET OF PAIRS
var arrColor = ['wheat', 'tomato', 'tan', 'snow', 'turquoise', 'springgreen', 'skyblue', 'maroon', 'moccasin', 'linen','wheat', 'tomato', 'tan', 'snow', 'turquoise', 'springgreen', 'skyblue', 'maroon', 'moccasin', 'linen', 'black', 'navy','red', 'blue', 'green', 'orange', 'yellow', 'lime',  'black', 'navy', 'red', 'blue', 'green', 'orange', 'yellow', 'lime', 'gray', 'violet', 'fushia', 'brown', 'gold', 'gray', 'violet', 'fushia', 'brown', 'gold', 'bronze', 'platinum', 'ochre', 'bronze', 'platinum', 'ochre'];

// SHUFFLE FUNCTION; GRANTED I GOT THIS OFF OF GOOGLE; IT'S SHORTER THAN WHAT I WOULD HAVE COME UP WITH
function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// STARTS GAME; 
var startGame = function() {
//SHUFFLES CARDS
var doTheShuffle = shuffle(arrColor);
//POPULATES BOARD; ASSIGNS VALUE FROM ARRAY SO WE CAN HAVE PAIRS(VALUES) TO MATCH
for(i = 0; i < 52; i++) {
  $('#board').append('<div class="card ' + arrColor[i] + '">' + '</div>');
} 
// SHOWS THE BOARD AND THEN FADES OUT
setTimeout(function() {
  $('.card').addClass('cardOut');
}, Timeout); // WE USE THE VAR ESTABLISHED ON LINE 6

};

// SET OF VARIABLES FOR TIMING & CLICK RECORDING
var cardPeek    = 700;
var Timeout     = 2000;
var pairsTally  = 0;
var timeClick   = 0;
var clickCard2  = 0;
var clickCard1  = 0;
var mousemove   = 0;

// CARD CLICK FUNCTIONS
var doYouWantToPlayAGame = function() {
// EXECUTE WHEN USER CLICKS ON CARD
$('.card').click(function(){
// BOOLEAN TYPE OF VALUE EXECUTED. IN THIS CASE IT GOES FROM 0 TO 1 WHICH THEN GETS TIMED PER LINE 73
  timeClick++;
// CHANGE THE CLASS ON THE CARD; USE TIMER FOR VISIBILITY; RETURN TO NORMAL STATE; RETURNING TO NORMAL HELPS IN CASE ITS A MISMATCH
  $(this).removeClass('cardOut').delay(cardPeek).queue(function () {$(this).addClass('cardOut');$(this).dequeue();     
    });

  $(this).mouseleave(function(){
    mousemove++; 
  });
  clickCard2 = $(this).attr('class');    
// IF CARD-CLICK 1 IS EXACTLY LIKE CARD-CLICK 2 THEN EXECUTE
 if (clickCard1 === clickCard2 && mousemove > 0) {
// LETS CLEAN OUT THE ADDED VALUE TO THE DIV AND FADE IT OUT
  $('.'+clickCard2.substr(5)).animate({opacity:0}, 200);
//RESET VALUES TO 0 FOR THE NEXT FIND
    mousemove   = 0;
    clickCard1  = 0;
// ADD TO THE TALLY
    pairsTally  = pairsTally+1;
// PRINT TALLY COUNT
    $('#tally').fadeIn(1500).css('display','block');
    $('#ticker').fadeIn(1500).css('display','block');
    document.getElementById('ticker').innerHTML = pairsTally;   
  } else {
    clickCard1  = clickCard2;
    mousemove   = 0;
 }

 if (pairsTally === 26) {
  $('#board').css('display','none');
  var winning   = "CONGRATULATIONS!!";
  document.getElementbyId('congrats').innerHTML = winning;
 }

});
     
};

// FRONT END USER INITIATED FUNCTIONS
$(document).ready(function() {
 $('#start').fadeIn(1500);
// FUNCTIONS ASSIGN TO HAPPEN ONCE YOU CLICK ON START BUTTON
 $('#start').click(function(){
// SHOW BOARD
  $('#board').css('display','block');
// HIDE START BUTTON
  $('#start').fadeToggle("800");
//SINCE WE'RE STARTING THESE VALUES ARE SET TO 0
  pairsTally  = 0;
  timeClick   = 0;
  clickCard2  = 0;
  clickCard1  = 0; 
// LET'S GET THE GAME ROLLING 
  startGame();
  doYouWantToPlayAGame();
     
  });

});