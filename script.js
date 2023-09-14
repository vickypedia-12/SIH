// Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsSection = document.querySelector("#questionsSection");
var quizContainer = document.querySelector("#quizContainer");
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

// Quiz time remaining

var secondsLeft = 75;

// Interval time

var holdInterval = 0;

// Penalty 10 seconds

var penalty = 10;

// Quiz questions array

var questions = [
  {
    title: "What does the right to education mean?",
    options: [
      "Every child has to attend school.",
      "Every child has the opportunity to learn and go to school.",
      "Education is only for the wealthy.",
      "Education is a privilege, not a right.",
    ],
    answer: "Every child has the opportunity to learn and go to school.",
  },
  {
    title:
      "Which organization oversees the global effort to ensure the Right to Education?",
    options: ["UNICEF", "UNESCO", "WHO", "Red Cross"],
    answer: "UNESCO",
  },
  {
    title: "What is the right to health?",
    options: [
      "The right to eat fast food.",
      "The right to be healthy no matter what you do.",
      "The right to access healthcare and live a healthy life.",
      "The right to exercise.",
    ],
    answer: "The right to access healthcare and live a healthy life.",
  },
  {
    title: "Which of the following is NOT part of the right to health?",
    options: [
      "Access to clean water and nutritious food.",
      "Access to medical care and informati.",
      "The right to never get si.",
      "A healthy environment to live .",
    ],
    answer: "The right to never get sick.",
  },
  {
    title: "Which of the following is NOT a form of child exploitation?",
    options: [
      "Child labor",
      "Child marriage",
      "Going to school",
      "Child trafficking",
    ],
    answer: "Going to school",
  },
  {
    title: "Which of the following is NOT an aspect of the Right to Safety?",
    options: [
      "A. Protection from abuse and violence",
      "B. Access to safe places to play",
      "C. Freedom to explore and learn",
      "D. Protection from child marriage",
    ],
    answer: "D. Protection from child marriage.",
  },
];

// Check questions array in console log

console.log(questions);

// Create ul for quiz questions

var ulEl = document.createElement("ul");
console.log(ulEl);
console.log(timer);
if (timer !== null) {
  timer.addEventListener("click", function () {
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = secondsLeft + " seconds";

        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          quizComplete();
          currentTime.textContent = "OOOPS! OUT OF TIME!";
        }
      }, 1000);
    }
    render(questionIndex);
  });
}
console.log(questionIndex);

// Renders questions

function render(questionIndex) {
  // Clears existing data

  questionsSection.innerHTML = "";
  ulEl.innerHTML = "";

  // Loop through questions array

  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].options;
    questionsSection.textContent = userQuestion;
  }
  // New for each for question

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsSection.appendChild(ulEl);
    ulEl.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
// Event to compare options with answer

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "answerDiv");

    // Correct condition

    if (element.textContent == questions[questionIndex].answer) {
      score++;
      answerDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
    } else {
      // Will deduct 10 seconds off secondsLeft for wrong answers

      secondsLeft = secondsLeft - penalty;
      answerDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }
  // Question Index determines number question user is on
  // Append page with user information

  questionIndex++;

  if (questionIndex >= questions.length) {
    quizComplete();
    answerDiv.textContent =
      "Finished!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsSection.appendChild(answerDiv);
}
// Quiz complete clear questionsSection

function quizComplete() {
  questionsSection.innerHTML = "";
  currentTime.innerHTML = "";

  // Create h1, p elements

  var h1El = document.createElement("h1");
  h1El.setAttribute("id", "h1El");
  h1El.textContent = "Quiz Complete!";

  questionsSection.appendChild(h1El);

  var pEl = document.createElement("p");
  pEl.setAttribute("id", "pEl");

  questionsSection.appendChild(pEl);

  // Calculates time remaining and creates score

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var pEl2 = document.createElement("p");
    clearInterval(holdInterval);
    pEl.textContent = "Your final score is: " + timeRemaining;

    questionsSection.appendChild(pEl2);
  }

  // User prompted to enter intials

  var enterInitials = document.createElement("initials");
  enterInitials.setAttribute("id", "enterInitials");
  enterInitials.textContent = "Enter your initials: ";

  questionsSection.appendChild(enterInitials);

  // Enter initials

  var userInput = document.createElement("input");
  userInput.setAttribute("type", "text");
  userInput.setAttribute("id", "initials");
  userInput.textContent = "";

  questionsSection.appendChild(userInput);

  // Submit user information

  var initialsSubmit = document.createElement("button");
  initialsSubmit.setAttribute("class", "btn btn-light");
  initialsSubmit.setAttribute("type", "submit");
  initialsSubmit.setAttribute("id", "submit");
  initialsSubmit.textContent = "Submit";

  questionsSection.appendChild(initialsSubmit);

  // Event listener to capture initials and score in local storage

  initialsSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = userInput.value;
    console.log(initials);
    if (!initials) {
      document.querySelector("#submit").textContent = "Enter a valid value!";
      console.log(initialsSubmit);
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };

      // Clearing HTML at #questionSection

      document.querySelector("#questionsSection").innerHTML = "";

      // Create High Scores page heading

      var h2El = document.createElement("h2");
      h2El.setAttribute("id", "h2El");
      h2El.textContent = "High Scores!";

      // Append element to page

      questionsSection.appendChild(h2El);

      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      // Adds score to final page

      for (let i = 0; i < allScores.length; i++) {
        const el = allScores[i].initials + " " + allScores[i].score;
        var li2 = document.createElement("li");
        li2.textContent = el;
        var ul = document.querySelector("#highScoresUl");
        ul.appendChild(li2);
      }
    }
  });
}
