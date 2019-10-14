// global variables //
var start = document.getElementById("start");
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var questionBtn = document.getElementById("questionBtn");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var finalScore = document.getElementById("finalScore");
var userName = document.getElementById("userName");
var submitScoreBtn = document.getElementById("submitScoreBtn");
var startQuestion = 0;
var score = 0;
var userScore = document.getElementById("userScore");
var secondsLeft = 15;
var countDown = secondsLeft;

// start quiz //
function startQuiz() {
  start.style.display = "none";
  showQuestion();
  quiz.style.display = "block"; // need to start timer after //
}

function startQuestions() {
  var q = questions[currentQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.textContent = q.choiceD;
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

// timer //
function startTimer() {
  var countDown = setInterval(function() {
    timer.textContent = "Time Left: " + secondsLeft;
    if (secondsLeft > 0) {
      secondsLeft--;
    } else {
      clearInterval(countDown);
      completeQuiz();
    }
  }, 1000);
}

// show score //
function showScore() {
  quiz.style.display = "none";
  finalScore.style.display = "block";
  yourScore.textContent = score;
}

// storage //
function storeScore(event) {
  event.preventDefault();
  var user = {
    name: nameImput.value,
    savedScore: score
  };

  localStorage.setItem("storage", JSON.stingify(user));
}

// check answer //
function checkAnswer(answer) {
  if (answer === questions[i].correct) {
    console.log(++score);
  }
  if (answer !== questions[i].correct) {
    // decrease 15 seconds of time
    timeLeft -= 15;
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

// events //
questionBtn.addEventListener("click", function() {
  startQuestion++;
  // call render question //
  questionDiv.innerHTML = renderQuestion(startQuestion);
  renderChoices(startQuestion);
});

// init //
questionDiv.innerHTML = renderQuestion(startQuestion);
renderChoices(0);
