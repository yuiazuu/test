const introOverlay = document.getElementById('intro-overlay');
const startBtn = document.getElementById('start-btn');
const mainContent = document.getElementById('main-content');
const heartContainer = document.getElementById('heart-container');
const flowerContainer = document.getElementById('flower-container');
const cardWrapper = document.getElementById('card-wrapper');
const bgMusic = document.getElementById('bg-music');

const prankTexts = [
    "sabi sayo wag click",
    "wag mong subukan",
    "tsk"
];
let prankStep = 0;

// Prank Logic (Night to Light)
startBtn.addEventListener('click', () => {
    if (prankStep < prankTexts.length) {
        // Change text
        startBtn.textContent = prankTexts[prankStep];

        // Randomly move button
        const randomX = Math.random() * 60 - 30; // -30% to 30%
        const randomY = Math.random() * 60 - 30; // -30% to 30%
        startBtn.style.transform = `translate(${randomX}vw, ${randomY}vh)`;

        prankStep++;
    } else {
        // The Final Click ("tsk")
        introOverlay.classList.add('reveal');
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'all';

        // Auto-play music (Triggered by final interaction)
        bgMusic.play().catch(err => console.log("Music play blocked:", err));

        // Start background animations
        initSurprise();
    }
});

function initSurprise() {
    // Generate Flowers
    const flowerDensity = 30;
    for (let i = 0; i < flowerDensity; i++) {
        setTimeout(createRandomFlower, i * 150);
    }

    // Start Heart Rain
    setInterval(createFloatingHeart, 600);
}

// Bloom effect on card click
cardWrapper.addEventListener('click', () => {
    cardWrapper.style.transform = 'scale(1.08)';
    setTimeout(() => {
        cardWrapper.style.transform = 'scale(1)';
    }, 200);
});

// Floating Hearts Generation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Realistic Flower System
const flowers = [
    'https://emojicdn.elk.sh/🌹?style=apple',
    'https://emojicdn.elk.sh/💐?style=apple',
    'https://emojicdn.elk.sh/🌷?style=apple',
    'https://emojicdn.elk.sh/🌸?style=apple',
    'https://emojicdn.elk.sh/🌻?style=apple'
];

function createRandomFlower() {
    const flower = document.createElement('img');
    flower.classList.add('flower-decoration');
    flower.src = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = (Math.random() * 100) + '%';
    flower.style.top = (Math.random() * 100) + '%';

    const size = Math.random() * 10 + 6;
    flower.style.width = size + 'rem';
    flower.style.height = 'auto';

    flower.style.animationDelay = Math.random() * 5 + 's';

    if (Math.random() > 0.5) {
        flower.style.transform = 'scaleX(-1)';
    }

    flowerContainer.appendChild(flower);
}
