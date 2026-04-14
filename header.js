document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
    <nav class="navbar">
        <div class="logo-container">
            <div class="logo" onclick="window.location.href='index.html'">
                <img src="assets/icons/icon-192.png" alt="Shree Vani Tutorial" id="mainLogo">
            </div>
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
        </div>

        <div class="search-box">
            <input type="text" id="topicSearchInput" placeholder="Search Topics...">
            <button onclick="searchByTopic()">🔍</button>
        </div>

        <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Home</a></li>
            <li><a href="notes.html">Notes</a></li>
            <li><a href="quiz.html">MCQ Quiz</a></li>
            <li><a href="books.html" class="special-link">Books & Stationery 🛒</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});

// Function to toggle menu on mobile
function toggleMobileMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}
