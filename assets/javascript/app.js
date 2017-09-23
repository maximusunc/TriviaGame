function shuffle (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

var timer = {
	timeRemaining: 30,
	reset: function() {
		timer.timeRemaining = 0
	},
}
var reset = function() {
	$("#question").html("")
	$("#answer1").html("");
	$("#answer2").html("");
	$("#answer3").html("");
	$("#answer4").html("");
}

$("#timeRemaining").html("<b>" + timer.timeRemaining + "<b>");

var queryURL = "https://opentdb.com/api.php?amount=15&category=12&difficulty=medium&type=multiple";

var correct;
var i = 0;

var nextQuestion = function() {

	reset();

	$.ajax({
    	url: queryURL,
    	method: 'GET'
	}).done(function(response) {
		console.log("next");
    	var question = response.results[i].question;
    	$("#question").html(question);
    	console.log(question);
    	correct = response.results[0].correct_answer
    	var answers = [];
    	answers.push(response.results[i].incorrect_answers[0]);
		answers.push(response.results[i].incorrect_answers[1]);
		answers.push(response.results[i].incorrect_answers[2]);
		answers.push(response.results[i].correct_answer);
		shuffle(answers);
		console.log(answers);
		$("#answer1").html(answers[0]);
		$("#answer2").html(answers[1]);
		$("#answer3").html(answers[2]);
		$("#answer4").html(answers[3]);
	});
};

$("#answers").on("click", "div", function(){
	console.log(this);
	i++;
	if ($(this).text() === correct) {
		reset();
		$("#question").html("<h1>Congrats! You're a genius!</h1>");
		var win = setTimeout(nextQuestion, 1000*4);

	} else {
		reset();
		$("#question").html("<h1>Wrong! Go back to school!</h1>");
		var lose = setTimeout(nextQuestion, 1000*4);
	}
})

nextQuestion();



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

