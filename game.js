
// Initialisation

var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// GAME STARTING ----- checking game started or not

$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    };
});

// selected button animation

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // this - catching user input by clicking on which colored button
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// checking answer
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

// random sequence generator - Game Pattern Generator

function nextSequence(){
    // userClickedPattern is reset here for next level
    userClickedPattern = [];
    
    // -------- title level increased every time next sequence function called
    level++;    
    $("#level-title").text("Level "+level);
    
    // --------- random number generation
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// sound assignment according to button pressed

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

// animation to button

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    },100);
}

// starting over game again

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
