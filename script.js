/** * 1. THE DATA BRIDGE */
let lastClass, lastSubject, lastTopic;
const dataMap = {
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
    "10_GK": typeof class10GK !== 'undefined' ? class10GK : []
};

const classSubjects = {
    1: ["Science", "SST", "GK"],
    2: ["Science", "SST", "GK"],
    3: ["Science", "SST", "GK"],
    4: ["Science", "SST", "GK"],
    5: ["Science", "SST", "GK", "Grammar","Computers"],
    6: ["Science", "SST", "GK"],
    7: ["Science", "SST", "GK"],
    8: ["Science", "SST", "GK"],
    9: ["Science", "SST", "GK"],
    10: ["Science", "SST", "GK"]
};

let currentQuestions = [];
let score = 0;

/** * 2. NAVIGATION & TOPIC OVERLAY */
function showSubjects(classNum) {
    const overlay = document.getElementById('subjectOverlay');
    const list = document.getElementById('subjectListButtons');
    const topicDiv = document.getElementById('topicSelection');

    if (!overlay || !list) return;

    overlay.style.display = 'flex';
    topicDiv.style.display = 'none'; 
    list.innerHTML = ''; 

    const subjects = classSubjects[classNum];
    if (subjects) {
        subjects.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'sub-btn';
            btn.innerText = sub;
            btn.onclick = () => prepareTopics(classNum, sub);
            list.appendChild(btn);
        });
    }
}

function prepareTopics(classNum, subject) {
    lastClass = classNum;
    lastSubject = subject;
    
    const key = `${classNum}_${subject}`;
    const allQuestions = dataMap[key];

    if (!allQuestions || allQuestions.length === 0) {
        alert("Questions for this subject are coming soon!");
        return;
    }

    const topicSelectionDiv = document.getElementById('topicSelection');
    const dropdown = document.getElementById('topicDropdown');
    topicSelectionDiv.style.display = 'block';
    
    const uniqueTopics = [...new Set(allQuestions.map(q => q.topic))];
    
    dropdown.innerHTML = '<option value="All">All Topics (Mixed)</option>';
    uniqueTopics.forEach(topic => {
        if(topic) {
            const opt = document.createElement('option');
            opt.value = topic;
            opt.innerText = topic;
            dropdown.appendChild(opt);
        }
    });
}

function closeOverlay() {
    const overlay = document.getElementById('subjectOverlay');
    overlay.style.display = 'none';
}

/** * 3. BULK QUIZ ENGINE */
function startTopicQuiz() {
    const selectedTopic = document.getElementById('topicDropdown').value;
    lastTopic = selectedTopic;
    
    document.getElementById('heroSection').style.display = 'none';
    closeOverlay();

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'block';

    loadBulkQuestions(lastClass, lastSubject, selectedTopic);
}

function loadBulkQuestions(classNum, subject, topic) {
    const key = `${classNum}_${subject}`;
    const allData = dataMap[key];
    
    let filtered = topic === "All" ? allData : allData.filter(q => q.topic === topic);
    
    // Pick 10 random
    currentQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    const container = document.getElementById('bulk-questions-area');
    container.innerHTML = ""; 
    
    currentQuestions.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'bulk-question-card'; 
        qDiv.innerHTML = `
            <div class="q-header">
                <span class="q-number">Question ${index + 1}</span>
                <span class="q-topic-tag">${q.topic}</span>
            </div>
            <p class="q-text">${q.question}</p>
            <div class="options-container">
                ${q.options.map((opt, i) => `
                    <label class="bulk-option">
                        <input type="radio" name="question${index}" value="${i}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(qDiv);
    });
    
    document.getElementById('submit-bulk-btn').style.display = 'block';
    window.scrollTo(0,0);
}

function calculateBulkResults() {
    score = 0;
    
    currentQuestions.forEach((q, index) => {
        const optionsContainer = document.querySelector(`.bulk-question-card:nth-child(${index + 1}) .options-container`);
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const userAnswer = selected ? parseInt(selected.value) : null;
        const isCorrect = userAnswer === q.answer;

        if (isCorrect) score++;

        // 1. Highlight the options
        const allOptionsInCard = optionsContainer.querySelectorAll('.bulk-option');
        allOptionsInCard.forEach((label, i) => {
            if (i === q.answer) {
                label.style.background = "#d4edda"; // Green for Correct
                label.style.borderColor = "#28a745";
                label.innerHTML += " ✅";
            } else if (i === userAnswer && !isCorrect) {
                label.style.background = "#f8d7da"; // Red for Wrong
                label.style.borderColor = "#dc3545";
                label.innerHTML += " ❌";
            }
            // Disable further clicking
            label.style.pointerEvents = "none";
        });

        // 2. Inject Explanation below the options
        const expDiv = document.createElement('div');
        expDiv.className = "bulk-explanation";
        expDiv.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
        optionsContainer.appendChild(expDiv);
    });

    // 3. Show Final Score at the top or bottom
    const resultArea = document.getElementById('result-area');
    resultArea.style.display = 'block';
    document.getElementById('final-score').innerText = `Final Score: ${score} / ${currentQuestions.length}`;
    
    // Scroll to the result area
    resultArea.scrollIntoView({ behavior: 'smooth' });

    // Hide the submit button so they don't submit twice
    document.getElementById('submit-bulk-btn').style.display = 'none';
    
    saveScore(score, currentQuestions.length);
}

/** * 4. UTILITIES & LEADERBOARD */
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) return;
    
    // Collect all loaded questions
    const allLoaded = Object.values(dataMap).flat();
    const matches = allLoaded.filter(q => q.question.toLowerCase().includes(query));

    if (matches.length > 0) {
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        currentQuestions = matches.sort(() => 0.5 - Math.random()).slice(0, 10);
        
        // Use the bulk rendering logic
        const container = document.getElementById('bulk-questions-area');
        container.innerHTML = ""; 
        currentQuestions.forEach((q, index) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'bulk-question-card'; 
            qDiv.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>
                <div class="options-container">${q.options.map((opt, i) => `
                <label class="bulk-option"><input type="radio" name="question${index}" value="${i}">${opt}</label>`).join('')}</div>`;
            container.appendChild(qDiv);
        });
        document.getElementById('submit-bulk-btn').style.display = 'block';
    } else { alert("No results found."); }
}

function saveScore(s, t) {
    const name = prompt("Enter name for leaderboard:");
    if (!name) return;
    let scores = JSON.parse(localStorage.getItem('eduQuizScores')) || [];
    scores.push({ name: name, score: s, total: t, date: new Date().toLocaleDateString() });
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

function clearScores() {
    if (confirm("Are you sure you want to delete all high scores?")) {
        localStorage.removeItem('eduQuizScores');
        displayScores();
    }
}

window.onload = displayScores;
/** * UPDATED NAVIGATION 
 * Highlighting the selected class and subject
 */
function showSubjects(classNum) {
    const overlay = document.getElementById('subjectOverlay');
    const list = document.getElementById('subjectListButtons');
    const topicDiv = document.getElementById('topicSelection');

    // Highlight the Class Card in the main grid (Optional)
    document.querySelectorAll('.class-card').forEach(card => card.classList.remove('active-card'));
    // Find the card that was clicked and add class (if needed)

    overlay.style.display = 'flex';
    topicDiv.style.display = 'none'; 
    list.innerHTML = ''; 

    const subjects = classSubjects[classNum];
    if (subjects) {
        subjects.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'sub-btn';
            btn.innerText = sub;
            
            // The Logic: Pass the button itself (event.target) to the next function
            btn.onclick = (e) => {
                highlightSelectedButton(e.target);
                prepareTopics(classNum, sub);
            };
            list.appendChild(btn);
        });
    }
}

// Helper function to handle the color change
function highlightSelectedButton(selectedBtn) {
    // 1. Remove 'active-sub' class from all buttons in the list
    const allBtns = document.querySelectorAll('.sub-btn');
    allBtns.forEach(btn => btn.classList.remove('active-sub'));

    // 2. Add 'active-sub' to the clicked button
    selectedBtn.classList.add('active-sub');
}

let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const btnInstall = document.getElementById('btnInstall');

// 1. Listen for the browser's install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show our custom install banner
    installBanner.style.display = 'block';
});

// 2. Handle the "Install App" button click
btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the native install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        // Hide our banner
        installBanner.style.display = 'none';
    }
});

// 3. Handle the "Maybe Later" button
document.getElementById('btnNoThanks').addEventListener('click', () => {
    installBanner.style.display = 'none';
});

// 4. Hide banner if already installed
window.addEventListener('appinstalled', () => {
    installBanner.style.display = 'none';
    console.log('Shree Edu Hub was installed.');
});