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

  const answers = [...q.a];
  const correctIndex = q.correct;
  shuffle(answers);

  answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

      const selectedIndex = answers.indexOf(ans);
      const isCorrect = q.a[correctIndex] === ans;

      if (isCorrect) {
        score++;
        btn.style.backgroundColor = "#b4ffb4"; // green
      } else {
        btn.style.backgroundColor = "#ffb4b4"; // red
      }

      setTimeout(() => {
        index++;
        if (index < questions.length) {
          loadQuestion();
        } else {
          showReward();
        }
      }, 1000);
    });

    answersEl.appendChild(btn);
  });
}

function showReward() {
  document.getElementById("question").textContent = `You scored ${score} / ${questions.length}`;
  document.getElementById("answers").innerHTML = "";

  if (score === questions.length) {
    document.getElementById("reward-box").style.display = "block";
  } else {
    const retry = document.createElement("button");
    retry.textContent = "Try Again";
    retry.onclick = () => location.reload();
    document.getElementById("answers").appendChild(retry);
  }
}

function sendReward() {
  const wallet = document.getElementById("wallet").value.trim();
  if (!wallet.startsWith("r") || wallet.length < 25) {
    return alert("Invalid XRPL address");
  }

  fetch("http://localhost:3000/claim-reward", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, game: "quiz" })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("🎉 Jinni Token sent! Tx Hash:\n" + data.txHash);
      } else {
        alert("❌ Error: " + (data.error || "Unknown"));
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Could not connect to reward server.");
    });
}

// Start game
loadQuestion();
