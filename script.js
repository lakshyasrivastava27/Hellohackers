// Dark Mode Toggle
const toggleBtn = document.getElementById('toggle-mode');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

// Quiz Data
const quizData = [
  {
    question: "What does XSS stand for in cybersecurity?",
    options: ["Cross-Site Scripting", "Extra Secure Site", "Extended System Security", "Execute Server Script"],
    answer: "Cross-Site Scripting"
  },
  {
    question: "Which tool is used for packet sniffing?",
    options: ["Nmap", "Wireshark", "Metasploit", "JohnTheRipper"],
    answer: "Wireshark"
  },
  {
    question: "SQL Injection is a type of?",
    options: ["XSS Attack", "Authentication", "Input-based attack", "Brute Force"],
    answer: "Input-based attack"
  },
  {
    question: "Which port does HTTPS use?",
    options: ["80", "20", "443", "22"],
    answer: "443"
  },
  {
    question: "VPN stands for?",
    options: ["Virtual Public Network", "Virtual Private Network", "Verified Protected Node", "Verified Private Net"],
    answer: "Virtual Private Network"
  }
];

let currentIndex = 0;
let score = 0;

// DOM Elements
const startBtn = document.getElementById('start-quiz');
const quizIntro = document.getElementById('quiz-intro');
const quizGame = document.getElementById('quiz-game');
const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('quiz-feedback');
const progressBar = document.getElementById('progress-bar');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
  quizIntro.style.display = 'none';
  quizGame.style.display = 'block';
  currentIndex = 0;
  score = 0;
  nextBtn.disabled = true;
  loadQuestion();
}

function loadQuestion() {
  const currentQ = quizData[currentIndex];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  nextBtn.disabled = true;

  currentQ.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('quiz-option');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, currentQ.answer);
    optionsEl.appendChild(btn);
  });

  updateProgressBar();
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll('.quiz-option');
  buttons.forEach(btn => btn.disabled = true);

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add('correct');
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
    feedbackEl.textContent = `❌ Wrong! Correct Answer: ${correctAnswer}`;
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function updateProgressBar() {
  const progress = ((currentIndex) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResults() {
  quizGame.innerHTML = `
    <h3>🎉 Quiz Completed!</h3>
    <p>You scored ${score} out of ${quizData.length}.</p>
    <button onclick="startQuiz()">Restart Quiz</button>
  `;
}

