const allQuestions = [
  {
    q: "What does HTML stand for?",
    a: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language", "HyperText Markdown Language"],
    correct: 1
  },
  {
    q: "Which one is a JavaScript framework?",
    a: ["Laravel", "React", "Django", "Flask"],
    correct: 1
  },
  {
    q: "What does CSS stand for?",
    a: ["Cascading Style Sheets", "Computer Style System", "Creative Style Syntax", "Colorful Style Sheets"],
    correct: 0
  },
  {
    q: "Which HTML tag is used to link a JavaScript file?",
    a: ["<link>", "<js>", "<script>", "<javascript>"],
    correct: 2
  },
  {
    q: "Which symbol is used for single-line comments in JavaScript?",
    a: ["<!-- -->", "##", "//", "/* */"],
    correct: 2
  },
  {
    q: "What is the correct file extension for JavaScript files?",
    a: [".js", ".java", ".script", ".javascript"],
    correct: 0
  },
  {
    q: "Which method converts JSON string to object?",
    a: ["JSON.toString()", "JSON.parse()", "parse.JSON()", "stringify()"],
    correct: 1
  }
];

// Utility: Shuffle an array in place
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Choose a random set of questions
shuffle(allQuestions);
const questions = allQuestions.slice(0, 5); // Show 5 questions per game

let index = 0;
let score = 0;

function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;

  const answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";

  // Make a copy of answers and remember the correct answer
  const originalAnswers = [...q.a];
  const correctAnswer = originalAnswers[q.correct];

  // Shuffle answers
  const shuffledAnswers = [...originalAnswers];
  shuffle(shuffledAnswers);

  shuffledAnswers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", () => {
      // Disable all buttons
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

      // Check if this answer is the original correct one
      const isCorrect = ans === correctAnswer;

      if (isCorrect) {
        score++;
        btn.style.backgroundColor = "#b4ffb4"; // green
      } else {
        btn.style.backgroundColor = "#ffb4b4"; // red
      }

      // Move to next question after delay
      setTimeout(() => {
        index++;
        if (index < questions.length) {
          loadQuestion();


