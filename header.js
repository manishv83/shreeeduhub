document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
    <nav class="navbar">
        <div class="logo" onclick="window.location.href='index.html'">
                <img src="assets/icons/icon-192.png" alt="Shree Vani Tutorial" id="mainLogo">
            </div>
             <div class="search-box">
            <input type="text" id="topicSearchInput" placeholder="Search Topics...">
            <button onclick="searchByTopic()">🔍</button>
        </div>
    <li><a href="books.html" style="color: #f1c40f;">Book and Stationery Recommendations 🛒</a></li>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="notes.html">Notes</a></li>
            <li><a href="quiz.html">MCQ Quiz</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});
