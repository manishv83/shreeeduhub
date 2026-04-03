/** * SHREE EDU HUB - CORE ENGINE  */

let lastClass, lastSubject, lastTopic;
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// Audio setup
const correctSound = new Audio('assets/audio/correct.mp3');
const wrongSound = new Audio('assets/audio/wrong.mp3');
const finalSound = new Audio('assets/audio/final.mp3');
/* --- GLOBAL DATA REGISTRY --- */
const masterDataMap = () => ({
    "1_Science": typeof class1Science !== 'undefined' ? class1Science : [],
    "1_SST": typeof class1SST !== 'undefined' ? class1SST : [],
    "1_GK": typeof class1GK !== 'undefined' ? class1GK : [],
    "2_Science": typeof class2Science !== 'undefined' ? class2Science : [],
    "2_SST": typeof class2SST !== 'undefined' ? class2SST : [],
    "2_GK": typeof class2GK !== 'undefined' ? class2GK : [],
    "3_Science": typeof class3Science !== 'undefined' ? class3Science : [],
    "3_SST": typeof class3SST !== 'undefined' ? class3SST : [],
    "3_GK": typeof class3GK !== 'undefined' ? class3GK : [],
    "4_Science": typeof class4Science !== 'undefined' ? class4Science : [],
    "4_SST": typeof class4SST !== 'undefined' ? class4SST : [],
    "4_GK": typeof class4GK !== 'undefined' ? class4GK : [],
    "5_Science": typeof class5Science !== 'undefined' ? class5Science : [],
    "5_SST": typeof class5SST !== 'undefined' ? class5SST : [],
    "5_GK": typeof class5GK !== 'undefined' ? class5GK : [],
    "5_Grammar": typeof class5Grammar !== 'undefined' ? class5Grammar : [],
    "5_Computers": typeof class5Computers !== 'undefined' ? class5Computers : [],
    "6_Science": typeof class6Science !== 'undefined' ? class6Science : [],
    "6_SST": typeof class6SST !== 'undefined' ? class6SST : [],
    "6_GK": typeof class6GK !== 'undefined' ? class6GK : [],
    "7_Science": typeof class7Science !== 'undefined' ? class7Science : [],
    "7_SST": typeof class7SST !== 'undefined' ? class7SST : [],
    "7_GK": typeof class7GK !== 'undefined' ? class7GK : [],
    "8_Science": typeof class8Science !== 'undefined' ? class8Science : [],
    "8_SST": typeof class8SST !== 'undefined' ? class8SST : [],
    "8_GK": typeof class8GK !== 'undefined' ? class8GK : [],
    "9_Science": typeof class9Science !== 'undefined' ? class9Science : [],
    "9_SST": typeof class9SST !== 'undefined' ? class9SST : [],
    "9_GK": typeof class9GK !== 'undefined' ? class9GK : [],
    "10_Science": typeof class10Science !== 'undefined' ? class10Science : [],
    "10_SST": typeof class10SST !== 'undefined' ? class10SST : [],
    "10_GK": typeof class10GK !== 'undefined' ? class10GK : [],
    "11_Physics": typeof class11Physics !== 'undefined' ? class11Physics : [],
    "11_Chemistry": typeof class11Chemistry !== 'undefined' ? class11Chemistry : [],
    "12_Physics": typeof class12Physics !== 'undefined' ? class12Physics : [],
    "12_Chemistry": typeof class12Chemistry !== 'undefined' ? class12Chemistry : []
});
/* --- 1. THE DATA BRIDGE --- */
function getQuizData(key) {
    const data = masterDataMap();
    return data[key] || [];
}

const classSubjects = {
    1: ["Science", "SST", "GK"], 2: ["Science", "SST", "GK"],
    3: ["Science", "SST", "GK"], 4: ["Science", "SST", "GK"],
    5: ["Science", "SST", "GK", "Grammar", "Computers"],
    6: ["Science", "SST", "GK"], 7: ["Science", "SST", "GK"],
    8: ["Science", "SST", "GK"], 9: ["Science", "SST", "GK"],
    10: ["Science", "SST", "GK"], 11: ["Physics", "Chemistry"],
    12: ["Physics", "Chemistry"]
};

/* --- 2. NAVIGATION --- */
function showSubjects(classNum) {
    lastClass = classNum;
    const overlay = document.getElementById('subjectOverlay');
    const list = document.getElementById('subjectListButtons');
    const topicDiv = document.getElementById('topicSelection');
    overlay.style.display = 'flex';
    topicDiv.style.display = 'none'; 
    list.innerHTML = ''; 
    const subjects = classSubjects[classNum];
    if (subjects) {
        subjects.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'sub-btn';
            btn.innerText = sub;
            btn.onclick = (e) => {
                highlightSelectedButton(e.target);
                prepareTopics(classNum, sub);
            };
            list.appendChild(btn);
        });
    }
}

function highlightSelectedButton(btn) {
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active-sub'));
    btn.classList.add('active-sub');
}

function prepareTopics(classNum, subject) {
    lastSubject = subject;
    const key = `${classNum}_${subject}`;
    const allQuestions = getQuizData(key);
    if (allQuestions.length === 0) {
        alert("Questions for this subject are coming soon!");
        return;
    }
    document.getElementById('topicSelection').style.display = 'block';
    const dropdown = document.getElementById('topicDropdown');
    const uniqueTopics = [...new Set(allQuestions.map(q => q.topic))];
    dropdown.innerHTML = '<option value="All">All Topics (Mixed)</option>';
    uniqueTopics.forEach(t => { if(t) dropdown.innerHTML += `<option value="${t}">${t}</option>`; });
}

function closeOverlay() { document.getElementById('subjectOverlay').style.display = 'none'; }

/* --- 3. QUIZ LOGIC --- */
function startTopicQuiz() {
    const selectedTopic = document.getElementById('topicDropdown').value;
    const key = `${lastClass}_${lastSubject}`;
    const allData = getQuizData(key);
    let filtered = selectedTopic === "All" ? allData : allData.filter(q => q.topic === selectedTopic);
    currentQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentIndex = 0; score = 0;
    document.getElementById('heroSection').style.display = 'none';
    closeOverlay();
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const q = currentQuestions[currentIndex];
    const area = document.getElementById('bulk-questions-area');
    updateProgressBar();
    area.innerHTML = `
        <div class="bulk-question-card animate-pop">
            <div class="q-header">
                <span class="q-number">Question ${currentIndex + 1} of ${currentQuestions.length}</span>
                    ${q.topic ? `<span class="q-topic-tag">${q.topic}</span>` : ''}
                </div>
            <p class="q-text">${q.question}</p>
            <div class="options-container">
                ${q.options.map((opt, i) => `
                    <button class="bulk-option" onclick="handleOptionClick(this, ${i})">${opt}</button>
                `).join('')}
            </div>
            <div id="explanation-box" class="bulk-explanation" style="display:none;"></div>
            <button id="next-btn-ui" class="next-btn" style="display:none;" onclick="handleNext()">
                ${currentIndex === currentQuestions.length - 1 ? 'Finish Quiz 🏆' : 'Next Question ➡️'}
            </button>
        </div>`;
}

function handleOptionClick(btn, i) {
    const q = currentQuestions[currentIndex];
    const allBtns = document.querySelectorAll('.bulk-option');
    allBtns.forEach(b => b.style.pointerEvents = 'none');
    if (i === q.answer) {
        correctSound.play().catch(e => console.log("Audio blocked"));
        btn.style.background = "#d4edda"; btn.style.borderColor = "#28a745";
        btn.innerHTML += " ✅"; score++;
    } else {
        wrongSound.play().catch(e => console.log("Audio blocked"));
        btn.style.background = "#f8d7da"; btn.style.borderColor = "#dc3545";
        btn.innerHTML += " ❌";
        allBtns[q.answer].style.background = "#d4edda";
        allBtns[q.answer].innerHTML += " ✅";
    }
    const exp = document.getElementById('explanation-box');
    exp.style.display = 'block';
    exp.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    document.getElementById('next-btn-ui').style.display = 'block';
}

function handleNext() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) { renderCurrentQuestion(); } 
    else { showFinalResults(); }
}

/* --- 4. GAMIFICATION & RESULTS --- */
function showFinalResults() {
    document.getElementById('quiz-container').style.display = 'none';
    const resArea = document.getElementById('result-area');
    resArea.style.display = 'block';

    const badge = getBadge(score);
    const streak = updateStreak();
    const isHighScore = score >= 8;

    if (score >= 8) {
        finalSound.play().catch(e => console.log("Audio blocked"));
        confetti({ particleCount: 100, spread: 70, origin: { x: 0, y: 0.6 } });
        confetti({ particleCount: 100, spread: 70, origin: { x: 1, y: 0.6 } });
    } else if (score === 10) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }

    document.getElementById('final-score').innerHTML = `
        <div class="badge-card ${isHighScore ? 'high-score-glow' : ''}">
            <div class="floating-emoji">${badge.emoji}</div>
            <h2 style="color: ${badge.color}">${badge.name} Unlocked!</h2>
            <p style="font-size: 1.5rem; margin: 10px 0;">Score: <strong>${score} / 10</strong></p>
            <div class="streak-badge">🔥 ${streak} Day Streak!</div>
        </div>
    `;
    saveScore(score, 10);
}

function getBadge(s) {
    if (s === 10) return { name: "Einstein", color: "#f1c40f", emoji: "🧠" };
    if (s >= 8) return { name: "Scholar", color: "#3498db", emoji: "🎓" };
    if (s >= 5) return { name: "Explorer", color: "#9b59b6", emoji: "🔍" };
    return { name: "Learner", color: "#95a5a6", emoji: "📚" };
}

function updateProgressBar() {
    const bar = document.getElementById('progress-bar');
    if(bar) bar.style.width = ((currentIndex) / currentQuestions.length * 100) + "%";
}

function updateStreak() {
    let today = new Date().toDateString();
    let last = localStorage.getItem('lastPlayDate');
    let streak = parseInt(localStorage.getItem('userStreak')) || 0;
    if (last === today) return streak;
    let yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    streak = (last === yesterday.toDateString()) ? streak + 1 : 1;
    localStorage.setItem('userStreak', streak);
    localStorage.setItem('lastPlayDate', today);
    return streak;
}

/* --- 5. UTILITIES --- */
function saveScore(s, t) {
    const name = prompt("Enter name for leaderboard:");
    if (!name) return;
    let scores = JSON.parse(localStorage.getItem('eduQuizScores')) || [];
    scores.push({ name, score: s, total: t, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('eduQuizScores', JSON.stringify(scores.slice(0, 5)));
    displayScores();
}

function displayScores() {
    const list = document.getElementById('scoreList');
    if (!list) return;
    const scores = JSON.parse(localStorage.getItem('eduQuizScores')) || [];
    list.innerHTML = scores.map(e => `<li>${e.name} <span>${e.score}/${e.total}</span></li>`).join('');
}

function searchByTopic() {
    const query = document.getElementById('topicSearchInput').value.toLowerCase().trim();
    if (!query) return;

    let foundResults = [];
    
    // AUTOMATICALLY gets all keys: ["1_Science", "1_SST", ..., "10_GK"]
    const allAvailableKeys = Object.keys(masterDataMap());

    allAvailableKeys.forEach(key => {
        const data = getQuizData(key);
        
        // Filter the topics within this specific subject
        const matches = data.filter(q => q.topic && q.topic.toLowerCase().includes(query));
        
        if (matches.length > 0) {
            // Group by Topic Name to avoid duplicate entries for the same topic
            const uniqueMatchingTopics = [...new Set(matches.map(m => m.topic))];
            
            uniqueMatchingTopics.forEach(topicName => {
                const topicSpecificCount = matches.filter(m => m.topic === topicName).length;
                
                foundResults.push({
                    source: key.replace("_", " Class "),
                    topicName: topicName,
                    count: topicSpecificCount,
                    key: key
                });
            });
        }
    });

    displaySearchResults(foundResults);
}

function displaySearchResults(results) {
    const container = document.getElementById('bulk-questions-area');
    const hero = document.getElementById('heroSection');
    
    // 1. Setup the view
    hero.style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';
    
    // 2. Clear previous results
    container.innerHTML = "<h2>Search Results</h2>";

    // 3. Handle No Results Found
    if (results.length === 0) {
        container.innerHTML += `
            <div style="text-align:center; padding: 40px;">
                <h3>🔍 No topics found.</h3>
                <p>Try searching for 'Science', 'Grammar', or 'GK'.</p>
                <button class="sub-btn" onclick="location.reload()">Back to Home</button>
            </div>`;
        return;
    }

    // 4. Render Result Cards
    results.forEach(res => {
        const div = document.createElement('div');
        div.className = 'bulk-question-card';
        div.innerHTML = `
            <h3>${res.topicName} (${res.source})</h3>
            <p>${res.count} questions available.</p>
            <button class="next-btn" onclick="startSearchQuiz('${res.topicName}', '${res.key}')">
                Start Practice 📝
            </button>
        `;
        container.appendChild(div);
    });
    
    window.scrollTo(0, 0); // Ensure user sees the results at the top
}
function clearScores() { if (confirm("Clear scores?")) { localStorage.removeItem('eduQuizScores'); displayScores(); } }

/* --- 6. PWA INSTALL LOGIC --- */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('install-banner');
    if(banner) banner.style.display = 'block';
});

document.getElementById('btnInstall')?.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        document.getElementById('install-banner').style.display = 'none';
    }
});

document.getElementById('btnNoThanks')?.addEventListener('click', () => {
    document.getElementById('install-banner').style.display = 'none';
});

window.onload = displayScores;
// Add this inside window.onload or at the bottom of script.js
const year = new Date().getFullYear();
const footerText = document.querySelector('.site-footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${year} Shree Edu Hub. All Rights Reserved.`;
}
function startSearchQuiz(topicName, key) {
    // 1. Set global state so the engine knows which class/subject we are in
    const parts = key.split('_');
    lastClass = parts[0];
    lastSubject = parts[1];

    // 2. Fetch the data
    const allData = getQuizData(key);
    
    // 3. Filter by the specific topic name
    let filtered = allData.filter(q => q.topic === topicName);
    
    // 4. Randomize and limit to 10
    currentQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    // 5. Reset quiz state and launch
    currentIndex = 0; 
    score = 0;
    
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';
    
    renderCurrentQuestion();
}
document.getElementById('topicSearchInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchByTopic();
    }
});
// Global listener for the physical Escape key
window.addEventListener('keydown', function (event) {
    // Check if the key pressed is 'Escape' (modern browsers) or 'Esc' (IE/Edge)
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        
        // Find the overlay
        const overlay = document.querySelector('.overlay');
        
        // Only run the close function if the overlay is actually open
        if (overlay && (overlay.style.display === 'flex' || overlay.style.display === 'block')) {
            closeSubjectOverlay();
        }
    }
});
function closeSubjectOverlay() {
    const overlay = document.querySelector('.overlay');
    
    if (overlay) {
        overlay.style.display = 'none'; // Force hide
    }

    // Optional: Reset the buttons
    const allButtons = document.querySelectorAll('.sub-btn');
    allButtons.forEach(btn => btn.classList.remove('active-sub'));
    
    console.log("Escape successful: Overlay closed.");
}
// This checks: "Does topic exist? If yes, show the span. If no, show nothing."
const topicTag = questionData.topic 
    ? `<span class="q-topic-tag">${questionData.topic}</span>` 
    : ''; 

target.innerHTML = `
    <div class="bulk-question-card">
        <div class="q-header">
            <span class="q-number">Question ${currentQuestionIndex + 1}</span>
            ${topicTag} 
        </div>
        <div class="q-text">${questionData.question}</div>
        </div>
`;