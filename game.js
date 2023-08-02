var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {   //Detecting first keypress and then changing the heading to level 1
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {    // Using jQuery to detect when any of the buttons are clicked and triggering a handler function.
    var userChosenColour = $(this).attr("id"); //storing the id of the button that got clicked in this userChosenColour variable

    userClickedPattern.push(userChosenColour); //Adding the contents of the variable userChosenColour to the end of userClickedPattern array

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); //Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //step 1
  
        // If the user got the most recent answer right in step 1 then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {   //Calling nextSequence() after a 1000 millisecond delay.
            nextSequence();
            }, 1000);
        }
      } 
      else {
    
        playSound(wrong);
        
        $("body").addClass("game-over"); //applying game-over class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Changing the h1 title to "Game Over, Press Any Key to Restart" if the user got the answer wrong
        setTimeout(function () {       
          $("body").removeClass("game-over");
        }, 200);

        startOver(); // calling startOver function if the sequence player enters is wrong 
      }
}

function nextSequence()
{
// Once nextSequence() is triggered in the checkAnswer function, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //generating random numbers from 0 to 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); //Adding the new randomChosenColour generated to the end of the gamePattern array
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); /*Using jQuery to select the button 
         with the same id as the randomChosenColour and using jQuery to animate a flash to the button selected   */
    playSound(randomChosenColour);
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed"); //Using jQuery to add pressed class to the button that gets clicked inside animatePress()

    setTimeout(function () {           // used stackoverflow to figure out how I can use Javascript to remove the pressed class after a interval of 100 milliseconds
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver()
{
    //resetting the values when the players enters the wrong sequence in the game
    level = 0;
    started = false;
    gamePattern = [];
}