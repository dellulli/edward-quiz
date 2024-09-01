const images = [
    "https://static.wikia.nocookie.net/breakingbad/images/a/a7/Tuco_BCS.jpg/revision/latest?cb=20170810082445",
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/13/12/the-walking-dead-andrea_0.jpg?width=1200&height=1200&fit=crop",
    "https://static.wikia.nocookie.net/dexter/images/b/b2/Dexter_s05e09_astor_bennett.jpg/revision/latest/scale-to-width-down/250?cb=20101212220237",
    "https://static.wikia.nocookie.net/breakingbad/images/3/34/TioSalamanca.jpg/revision/latest?cb=20100516195603",
    "https://static.wikia.nocookie.net/walkingdead/images/2/28/Season_one_michonne_grimes_towl_%282%29.png/revision/latest?cb=20240421154245",
    "https://static.wikia.nocookie.net/walkingdead/images/5/5f/Season_eleven_carol_peletier.png/revision/latest?cb=20221121230605",
    "https://static.wikia.nocookie.net/villains/images/5/54/Light_YagamiHD.jpg/revision/latest?cb=20180414020152",
    "https://i.insider.com/5da8aa7a695b581773751225?width=700",
    "https://static.wikia.nocookie.net/regularshowfanon/images/9/9b/Reg_margaret.png/revision/latest?cb=20130927003922",
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
    const baseURL = `${window.location.origin}/results.html`;
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
