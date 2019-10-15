// array of questions (question-string, choices-array, answer-string, key-number) //
var questions = [
  {
    prompt: "Which is a species of wild horse?",
    choices: ["Thoroughbred", "Mustang", "Fresian", "Arabian"],
    answer: "Mustang"
  },
  {
    prompt: "Which is not a style of horse-back riding?",
    choices: ["English", "Saddle Seat", "Western", "Backwards"],
    answer: "Backwards"
  },
  {
    prompt: "How can you tell a horse is listening to you?",
    choices: [
      "From their ears moving",
      "They start to smile",
      "When they respond back",
      "They start to swish their tail"
    ],
    answer: "From their ears moving"
  },
  {
    prompt: "What is a young female horse called?",
    choices: ["Foal", "Colt", "Mare", "Filly"],
    answer: "Filly"
  },
  {
    prompt: "Which is not a natural horse gait",
    choices: ["Canter", "Walk", "Trot", "Gallop"],
    answer: "Trot"
  }
];

// variables to tie together js to html //
var containerDiv = document.getElementById("container"); // need? - probably not //
var headerDiv = document.getElementById("header");
var highScoresDiv = document.getElementById("highScores");
var timerDiv = document.getElementById("timer");
var startDiv = document.getElementById("start");
var startQuiz = document.getElementById("startQuiz");
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var finalScore = document.getElementById("finalScore");
var userScore = document.getElementById("userScore");
var nameInput = document.getElementById("name");
var submitScoreBtn = document.getElementById("submitScoreBtn");
var highScores2 = document.getElementById("highScores2");
var highScores3 = document.getElementById("highScores3");
var nameScore = document.getElementById("name-Score");
var homeDiv = document.getElementById("home");

// other variables //
var startQuestion = 0;
var currentQuestion = 0;
var finalQuestion = questions.length - 1;
var score = 0;
var countDown = secondsLeft;
var secondsLeft = 30;
var timer = 0;

// helpers //
function renderQuestion(index) {
  return questionDiv[currentQuestion].prompt;
}

function askQuestion() {
  var q = questions[currentQuestion];
  questionDiv.innerHTML = "<div>" + q.prompt + "</div>";
  choiceA.innerHTML = "<div>" + q.choices[0] + "</div>";
  choiceB.innerHTML = "<div>" + q.choices[1] + "</div>";
  choiceC.innerHTML = "<div>" + q.choices[2] + "</div>";
  choiceD.innerHTML = "<div>" + q.choices[3] + "</div>";
}

// start quiz //
function beginQuiz() {
  startDiv.style.display = "none";
  askQuestion();
  startQuiz.style.display = "block"; // need to start timer after //
  startTimer();
}

// timer //
function startTimer() {
  timer = setInterval(function() {
    timerDiv.textContent = secondsLeft;
    secondsLeft--;
    if (secondsLeft <= 0) {
      timerDiv.textContent = "";
      clearInterval(timer);
    }
  }, 1000);
}

function checkAnswer(answer) {
  if (answer === questions[currentQuestion].correct) {
    score += 10;
  }
  if (answer !== questions[currentQuestion].correct) {
    // decrease 15 seconds of time //
    secondsLeft -= 30;
    score -= 0;
  }
  if (currentQuestion < finalQuestion) {
    currentQuestion++;
    askQuestion();
  } else {
    clearInterval(timer);
    showScore();
  }
}

function showScore() {
  // hide quiz //
  startQuiz.style.display = "none";
  finalScore.style.display = "block";
  // show score //
  userScore.textContent = score + secondsLeft;
}

// storage //
function storeScore(event) {
  event.preventDefault();
  var user = {
    name: nameInput.value,
    savedScore: score + secondsLeft
  };

  localStorage.setItem("storage", JSON.stingify(user));
}

function renderScore() {
  nameScore.innerHTML = "";
  var lastUser = JSON.parse(localStorage.getItem("storage"));
  for (var i = 0; i < lastUser.length; i++) {
    var name = user[i].nameInput;
    var score = user[i].savedScore;
    var div = document.createElement("div");
    div.textContent = name + "   " + score;
    div.setAttribute("data-index", i);
    nameScore.appendChild(div);
  }
  if ((lastUser = null)) {
    lastUser = user;
  }
}

function scoresPage() {
  startDiv.style.display = "none";
  startQuiz.style.display = "none";
  finalScore.style.display = "none";
  highScores3.style.display = "block";
  //stop clock //
  clearInterval(timer);
  // send finished scores to highscores page //
  renderScore();
}

function init() {
  startDiv.style.display = "block";
  startQuiz.style.display = "none";
  finalScore.style.display = "none";

  var lastUser = JSON.parse(localStorage.getItem("storage"));

  if (lastUser !== null) {
    user = lastUser;
  }
}

// events //
startDiv.addEventListener("click", beginQuiz);
submitScoreBtn.addEventListener("click", storeScore);
highScoresDiv.addEventListener("click", scoresPage);

// init //
init();
