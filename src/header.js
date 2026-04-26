document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the current page is inside a subfolder
    const pathArray = window.location.pathname.split('/');
    const isInSubfolder = pathArray.some(path => ['stories', 'notes', 'quizzes', 'quiz'].includes(path));
    
    // 2. Define the prefix (Go up if in subfolder, stay here if in root)
    const root = isInSubfolder ? '../' : './';

    const headerHTML = `
    <nav class="navbar">
        <div class="logo" onclick="window.location.href='${root}index.html'">
            <img src="${root}assets/icons/icon-192.png" alt="Shree Vani Tutorial" id="mainLogo">
        </div>
        
        <div class="search-box">
            <input type="text" id="topicSearchInput" placeholder="Search Topics...">
            <button onclick="searchByTopic()">🔍</button>
        </div>

        <ul class="nav-links">
            <li><a href="${root}books.html" style="color: #f1c40f;">Books & Stationery 🛒</a></li>
            <li><a href="${root}index.html">Home</a></li>
            <li><a href="${root}stories/index.html">Stories</a></li>
            <li><a href="${root}notes/notes.html">Notes</a></li>
            <li><a href="${root}quiz/quiz.html">MCQ Quiz</a></li>
            <li><a href="${root}about.html">About</a></li>
        </ul>
    </nav>`;

    // Insert the header at the very top of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});