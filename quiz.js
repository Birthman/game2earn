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

// Choose a random set of 5 questions
shuffle(allQuestions);
const questions = allQuestions.slice(0, 5);

let index = 0;
let score = 0;


function loadQuestion() {
  const q = questions[index];
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");

  // Clear previous content
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";

  const correctAnswer = q.a[q.correct];

  // Shuffle answers for randomness
  const shuffledAnswers = [...q.a];
  shuffle(shuffledAnswers);

  shuffledAnswers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
      // Disable all answer buttons
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

      // Highlight result
      if (answer === correctAnswer) {
        btn.style.backgroundColor = "#b4ffb4"; // correct
        score++;
      } else {
        btn.style.backgroundColor = "#ffb4b4"; // incorrect
      }

      // Wait before loading next question or showing result
      setTimeout(() => {
        index++;
        if (index < questions.length) {
          loadQuestion();
        } else {
          showReward();
        }
      }, 1000);
    };

    answersEl.appendChild(btn);
  });
}

