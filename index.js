var gameSequence = [];

var userClickedSequence = [];

var color = ["red", "blue", "yellow", "green"];

var level = 0;

var stated = false;

if (!stated)
  $(".start").on("click", function() {
    nextSequence()
    stated = true;
  })

function startOver() {
  level = 0;
  stated = false;
  gameSequence = [];
}

function checkAnswer(currentLevel) {
  if (userClickedSequence[currentLevel] === gameSequence[currentLevel]) {
    console.log("succes");

    if (userClickedSequence.length === gameSequence.length) {

      setTimeout(nextSequence, 1000);
    }
  } else {
    $("h1").text("Game Over, Press play to Restart");

    var goAudio = new Audio("sounds/wrong.mp3");
    goAudio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {

  userClickedSequence = [];
  level++;
  $("h1").text("level " + level);

  // adding random new Sequence

  var randomNum = Math.floor(Math.random() * 4);
  gameSequence.push(color[randomNum]);

  // animation and sound

  $("." + color[randomNum]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(color[randomNum]);
}

// button pressed by user

$(".btn").on("click", function(event) {
  var userClickedBtn = $(this).attr("id");
  userClickedSequence.push(userClickedBtn);

  checkAnswer(userClickedSequence.length - 1);

  animatePress(userClickedBtn);
  playSound(userClickedBtn);
})

// pressed animation and sound

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
