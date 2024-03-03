//Empty array to receive patterns
var gamePattern = [];

//Empty array to store users clicks
var userClickedPattern = [];

//Array of all the button colors
var buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

var started = false; //Boolean trigger
var level = 0; //Initial level

$(document).keydown(function() {
    if (!started) { //Checks value of trigger
        $("#level-title").text("Level " + level); //Updates the title text to show the current level
        nextSequence(); //Starts the game
        started = true; //Flips the trigger so this function can not be called again.
    } 
});

//Use jquery to check when any button is clicked.
$(".btn").click(function() {
    //Create a variable that stores the id of a clicked button.
    var userChosenColor = $(this).attr("id");
    //Add the id of the clicked button to the array.
    userClickedPattern.push(userChosenColor);

    //playSound now takes an input parameter and then runs through the function to play the sound of the User Selected color
    playSound(userChosenColor); 
    //Flashes the pressed tag on the chosen button
    animatePress(userChosenColor); 

    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);
});


function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    // Function to flash each color with a delay
    function flashColorWithDelay(index) {
        if (index < gamePattern.length) {
            setTimeout(function() {
                $("#" + gamePattern[index]).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
                flashColorWithDelay(index + 1); // Flash the next color
            }, 500); // Delay between each flash
        } else {
            // After flashing all previous colors, flash the new random color
            setTimeout(function() {
                var randomNumber = Math.floor(Math.random() * 4);
                var randomChosenColor = buttonColors[randomNumber];
                gamePattern.push(randomChosenColor);
                $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(randomChosenColor);
            }, 500);
        }
    }

    // Start flashing the colors with delay
    flashColorWithDelay(0);

    
    /*
    var randomNumber = Math.floor(Math.random() * 4); //Generates a random number 0-3. Math floor rounds down.
    var randomChosenColor = buttonColors[randomNumber]; //Selects an entry in the array for the value gained from random number.
    gamePattern.push(randomChosenColor); //Assigns the random color to the gamePattern array.
    
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, 500 * i); // Flash each color with a delay
    }
   
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Makes the selected button flash
   
    playSound(randomChosenColor); //playSound now takes an input parameter and then runs through the function to play the sound of the chosen color
     */


    userClickedPattern = []; //Resets the array at the start of a new round. Makes it to where you have to select all the previous colors to match the gamePattern array
   
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); //Plays the sound associated with the chosen color

};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); //Adds the class pressed to the selected button
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");// Removes the class from the selected button after 100ms
        }, 100);
    }
    
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //Compares entries of both arrays to verify
        console.log("Success");


    if (gamePattern.length === userClickedPattern.length) { //If arrays are equal, starts next round.
        setTimeout(function() {
            nextSequence();
             
        },1000);
    }

    } else {
        playSound("wrong");
        $("body").addClass("game-over")
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong!");
    };

   
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

