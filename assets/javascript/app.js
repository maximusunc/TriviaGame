// Define all global variables
var correct;
var i = 0;
var right = 0;
var wrong = 0;
var unanswered = 0
var firstTime = true;
var timeCount;
var queryURL = "https://opentdb.com/api.php?amount=15&category=12&difficulty=easy&type=multiple";
var question;
var answer1;
var answer2;
var answer3;
var answer4;
// shuffle function for answers array
function shuffle (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
};
// reset function to clear the display after each question
var reset = function() {
	$("#question").html("");
	$("#answer1").html("");
	$("#answer2").html("");
	$("#answer3").html("");
	$("#answer4").html("");
};
// timer object to facilitate the count down
var timer = {
	timeRemaining: 21,
	count: function() {
		timer.timeRemaining--;
		$("#timeRemaining").text(timer.timeRemaining);
	}
};
// function to start the game, different display for very first playthrough and every subsequent playthrough
var nextGame = function() {
	if (firstTime) {
		$("#question").html("<button>Play!</button>");
		$("button").on("click", function(){
			firstTime = false;
			nextQuestion();
		});
	} else {
		$("#question").html("<button>Play Again!</button>");
		$("#answer1").html("Correct Answers: " + right);
		$("#answer2").html("Incorrect Answers: " + wrong);
		$("#answer3").html("Unanswered Questions: " + unanswered);
		// button click resets important variables and grabs new questions
		$("button").on("click", function(){
			i = 0;
			right = 0;
			wrong = 0;
			nextQuestion();
		});
	};
};
// API to fetch questions from opentdb, then stores questions/answers in variables
var generateNewSet = function() {
	$.ajax({
    	url: queryURL,
    	method: 'GET'
	}).done(function(response) {
		console.log(i);
   		question = response.results[i].question;
   		answer1 = response.results[i].incorrect_answers[0];
   		answer2 = response.results[i].incorrect_answers[1];
   		answer3 = response.results[i].incorrect_answers[2];
   		correct = response.results[i].correct_answer;
   		// method of putting answers in an array and shuffling them to randomize
   		var answers = [];
   		answers.push(answer1);
		answers.push(answer2);
		answers.push(answer3);
		answers.push(correct);
		shuffle(answers);
		// displays question/answers to user
		$("#question").html("<p>" + question + "</p>");
		console.log(question);
		$("#answer1").html("<p>" + answers[0] + "</p>");
		$("#answer2").html("<p>" + answers[1] + "</p>");
		$("#answer3").html("<p>" + answers[2] + "</p>");
		$("#answer4").html("<p>" + answers[3] + "</p>");
		// increases i to grab the next set of question/answers
		i++;
	});
};

var nextQuestion = function() {
	// clear display
	reset();
	// check if we've reached the end of the questions
	if (i == 15) {
		return nextGame();
	} else {
	// generate the next question/answers
		generateNewSet();
		// sets the timer to count down
		timer.timeRemaining = 21;
		timeCount = setInterval(function() {
		timer.count();}, 1000);
		// Once the time runs out, say so and get the next question
		if (timer.timeRemaining == 0) {
			reset();
			$("#question").html("<h1>You took too long! Go back to school!</h1>");
			$("#answer2").html("<h3>The correct answer was: " + correct);
			var lose = setTimeout(nextQuestion, 1000*1);
			unanswered++;
			clearInterval(timeCount);
		};
	};
};
// click feature for picking an answer
$("#answers").on("click", "div", function(){
	console.log($(this).text());
	// check if user guessed the right answer, and goes to the next
	if ($(this).text() == correct) {
		reset();
		$("#question").html("<h1>Congrats! You're a genius!</h1>");
		var win = setTimeout(nextQuestion, 1000*1);
		right++;
		clearInterval(timeCount);
	// if user was wrong, display and go to next
	} else {
		reset();
		$("#question").html("<h1>Wrong! Go back to school!</h1>");
		$("#answer2").html("<h3>The correct answer was: " + correct);
		var lose = setTimeout(nextQuestion, 1000*1);
		wrong++;
		clearInterval(timeCount);
	};
});
// very verbose hover feature to highlight the answer user mouses over
$("#answer1").hover(function() {
	$(this).css("background-color", "white");
}, function() {
	$(this).css("background-color", "yellow");
});
$("#answer2").hover(function() {
	$(this).css("background-color", "white");
}, function() {
	$(this).css("background-color", "yellow");
});
$("#answer3").hover(function() {
	$(this).css("background-color", "white");
}, function() {
	$(this).css("background-color", "yellow");
});
$("#answer4").hover(function() {
	$(this).css("background-color", "white");
}, function() {
	$(this).css("background-color", "yellow");
});
// After everything is identified, start the game
nextGame();



// var questions = {
// 	"Sfumato is a technique in what? ": 
// 	["Painting", "Cooking", "Martial Arts", "Meditation"], 
// 	Painting
// 	"Melanophobia is the irrational fear of what? ": 
// 	["The colour black", "Punishment", "Fruit", "Children"],
// 	The colour black
// 	"Which nation's flag features a gold lion holding a kastane sword with its right forepaw? ": 
// 	["Bangladesh", "Nepal", "Bhutan", "Sri Lanka"],
// 	Sri Lanka
// 	"The disorder of 'rickets' is most often caused by a deficiency of which vitamin? ": 
// 	["Vitamin B", "Vitamin E", "Vitamin C", "Vitamin D"],
// 	"The Bridal Chorus, generally known today as 'Here Comes the Bride', is from the 1850 opera 'Lohengrin'. Who composed the march? ": 
// 	["Ludwig van Beethoven", "Richard Wagner", "Johannes Brahms", "Maurice Ravel"],
// 	Richard Wagner
// 	"Which of the following James Bond films was the first to be released? ": 
// 	["Goldfinger", "Thunderball", "You Only Live Twice", "From Russia With Love"],

// }

