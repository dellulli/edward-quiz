const images = [
    "tuco.png",
    "andrea.png",
    "astor.png",
    "hector.png",
    "mommy.png",
    "carol.png",
    "light.png",
    "edward.png",
    "margaret.png",
    "image.png"
];
const answers = [
    "tuco", "andrea", "astor", "hector", "mommy", 
    "carol", "light", "edward", "margaret", "any"
];

let currentImageIndex = 0;
let userAnswers = [];
let timer = 45;
let interval;

const imageElement = document.getElementById('game-image');
const timeLeftElement = document.getElementById('time-left');
const userAnswerInput = document.getElementById('user-answer');
const resultsTableBody = document.querySelector('#results-table tbody');
const finalScoreElement = document.getElementById('final-score');
const resultContainer = document.getElementById('result-container');
const shareLinkElement = document.getElementById('share-link');

function startGame() {
    interval = setInterval(updateTimer, 1000);
    imageElement.src = images[currentImageIndex];
}

function updateTimer() {
    timer--;
    timeLeftElement.textContent = timer;
    if (timer === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(interval);
    document.querySelector('.game-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    showResults();
    generateShareLink();
}

function showResults() {
    let score = 0;
    resultsTableBody.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const correctAnswer = answers[index];
        const isCorrect = (correctAnswer === "any") || (answer.toLowerCase() === correctAnswer);
        if (isCorrect) score++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${answer}</td>
            <td>${correctAnswer}</td>
            <td class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '✔' : '✘'}</td>
        `;
        resultsTableBody.appendChild(row);
    });

    finalScoreElement.innerHTML = `Your score: ${score}/10. You entered <b>${userAnswers[9]}</b> for the last image.`;
}

function generateShareLink() {
    const baseURL = window.location.href.split('?')[0];
    const queryParams = `?answers=${encodeURIComponent(userAnswers.join(','))}&score=${encodeURIComponent(userAnswers[9])}`;
    const shareableLink = `${baseURL}${queryParams}`;
    shareLinkElement.innerHTML = `
        <p>Share your results: <input type="text" value="${shareableLink}" id="shareable-link" readonly> 
        <button id="copy-link">Copy Link</button></p>
    `;
    
    document.getElementById('copy-link').addEventListener('click', () => {
        const linkInput = document.getElementById('shareable-link');
        linkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });
}

document.getElementById('submit-answer').addEventListener('click', (event) => {
    handleSubmit();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSubmit();
    }
});

function handleSubmit() {
    const userAnswer = userAnswerInput.value.trim();
    if (userAnswer) {
        userAnswers.push(userAnswer);
        currentImageIndex++;
        
        if (currentImageIndex < images.length) {
            imageElement.src = images[currentImageIndex];
            userAnswerInput.value = '';
        } else {
            endGame();
        }
    }
}

startGame();
