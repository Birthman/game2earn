const questions = [
  {
    q: "What does HTML stand for?",
    a: ["Hyper Text Markup Language", "Hot Text Mail Language", "How To Make Lasagna"],
    correct: 0
  },
  {
    q: "What symbol starts a JavaScript comment?",
    a: ["#", "//", "--"],
    correct: 1
  },
  {
    q: "Which one is NOT a programming language?",
    a: ["Python", "BananaScript", "Java"],
    correct: 1
  }
];

let index = 0;
let score = 0;

function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  const answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";

  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", function () {
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);
      if (i === q.correct) {
        score++;
        this.style.backgroundColor = "#b4ffb4";
      } else {
        this.style.backgroundColor = "#ffb4b4";
      }
    });

    answersEl.appendChild(btn);
  });
}

function nextQuestion() {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question-box").style.display = "none";
    if (score >= 2) {
      document.getElementById("reward-box").style.display = "block";
    } else {
      document.body.innerHTML = `<h2>Try again! You need at least 2 correct answers.</h2>`;
    }
  }
}

function sendReward() {
  const wallet = document.getElementById("wallet").value;

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

