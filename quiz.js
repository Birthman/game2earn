function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  const answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";

  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", () => {
      // Disable all buttons after one is clicked
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

      if (i === q.correct) {
        score++;
        btn.style.backgroundColor = "#b4ffb4"; // green for correct
      } else {
        btn.style.backgroundColor = "#ffb4b4"; // red for wrong
      }
    });

    answersEl.appendChild(btn);
  });
}
