// global variables (might not need all of these) //
var start = document.getElementById("start");
var startQuiz = document.getElementById("startQuiz");
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var timerDiv = document.getElementById("timer");
var questionBtn = document.getElementById("questionBtn");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");
var finalScore = document.getElementById("finalScore");
var userName = document.getElementById("userName");
var submitScoreBtn = document.getElementById("submitScoreBtn");
var startQuestion = 0;
var i = 0;
var finalQuestion = questions.length - 1;
var score = 0;
var userScore = document.getElementById("userScore");
var secondsLeft = 15;
var countDown = secondsLeft;
var timer = 0;

// start quiz //
function startQuiz() {
  start.style.display = "none";
  showQuestion();
  quiz.style.display = "block"; // need to start timer after //
  startTimer();
}

// need to show first question //
function startQuestions() {
  var q = questions[i];
  questionDiv.innerHTML = "<p>" + q.questionDiv + "</p>";
  answerA.innerHTML = q.answerA;
  answerB.innerHTML = q.answerB;
  answerC.innerHTML = q.answerC;
  answerD.textContent = q.answerD;
}

// helpers //
// takes in index, uses that index to find question in database to return the title //
function renderQuestion(index) {
  return questions[index].title;
}

// another helper - takes in index, uses this index to return the choices from the database //
function renderChoices(index) {
  choicesDiv.innerHTML = "";
  for (i = 0; i < questions[index].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = questions[index].choices[i];
    choicesDiv.appendChild(choiceBtn);
  }
}

// show score - need to hide quiz first //
function showScore() {
  quiz.style.display = "none";
  finalScore.style.display = "block";
  userScore.textContent = score + secondsLeft;
}

// storage //
function storeScore(event) {
  event.preventDefault();
  var user = {
    name: userName.value,
    savedScore: score + secondsLeft
  };

  localStorage.setItem("storage", JSON.stingify(user));
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

// check answer //
function checkAnswer(answer) {
  if (answer === questions[i].correct) {
    score += 10;
  }
  if (answer !== questions[i].correct) {
    // decrease 15 seconds of time //
    timeLeft -= 15;
    score -= 0;
  }
  if (i < finalQuestion) {
    i++;
    showQuestion();
  } else {
    clearInterval(timeInterval);
    showScore();
  }
}

// complete quiz //
function completeQuiz() {
  quizPage.classList.add("hide");
  finQuiz.classList.remove("hide");
  var finalScore = secondsLeft;
  // display score //
  score.style.display = "block";
  score.innerHTML += "<p>" + finalScore + "</p>";
}

function init() {
  start.style.display = "block";
  startQuiz.style.display = "none";
  finalScore.style.display = "none";
}

// events //
start.addEventListener("click", startQuiz);
questionBtn.addEventListener("click", function() {
  startQuestion++;
  // call render question //
  questionDiv.innerHTML = renderQuestion(startQuestion);
  renderChoices(startQuestion);
});

// init //
questionDiv.innerHTML = renderQuestion(startQuestion);
renderChoices(0);
init();
