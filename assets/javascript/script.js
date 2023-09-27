// Define quiz questions and answers
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A) Hyper Transfer Markup Language", correct: false },
            { text: "B) Hyper Text Markup Language", correct: true },
            { text: "C) Hyperlink and Text Markup Language", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "A) Cascading Style Sheets", correct: true },
            { text: "B) Computer Style Sheets", correct: false },
            { text: "C) Creative Style Sheets", correct: false }
        ]
    },
    // Add more questions here
    {
        question: "What is a ReadMe.md",
        answers: [
            { text: "A) A Readme.md file.", correct: false },
            { text: "B) A File for notes.", correct: false },
            { text: "C) Empty File", correct: false },
            { text: "D) A file to leave behind mark downs.", correct: true}
        ]
    },

    
];

let currentQuestionIndex = 0;
let timeLeft = 60; // Set the quiz duration in seconds
let timer;

const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-button");

startButton.addEventListener("click", startQuiz);
answerButtons.addEventListener("click", (e) => selectAnswer(e.target.textContent));
submitButton.addEventListener("click", saveScore);

function startQuiz() {
    startButton.disabled = true;
    timer = setInterval(updateTimer, 1000);
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answerButtons.innerHTML = "";

    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.answers.find((answer) => answer.correct);

    if (selectedAnswer === correctAnswer.text) {
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect. The correct answer is: " + correctAnswer.text;
        timeLeft -= 10; // Subtract 10 seconds for incorrect answers
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    timerElement.textContent = "Time Left: " + timeLeft + "s";
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    timerElement.textContent = "Time's up!";
    answerButtons.innerHTML = "";
    resultElement.textContent = "";

    // Show input for initials and submit button
    initialsInput.style.display = "block";
    submitButton.style.display = "block";
}

function saveScore() {
    const initials = initialsInput.value;
    // Here you can save the initials and score to a database or display them as needed.
    // For this example, we'll simply display the initials and score.
    resultElement.textContent = "Score: " + timeLeft + " seconds remaining for " + initials;
}