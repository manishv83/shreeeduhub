document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
    <nav class="navbar">
        <div class="logo" onclick="window.location.href='index.html'">Shree<span>Vani Tutorial</span></div>
        
        <div class="search-box">
            <input type="text" id="topicSearchInput" placeholder="Search Topics...">
            <button onclick="searchByTopic()">🔍</button>
        </div>
    <li><a href="storefront.html" style="color: #f1c40f;">Book and Stationery Recommendations 🛒</a></li>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li class="dropdown">
                <a href="javascript:void(0)">Classes ▾</a>
                <ul class="dropdown-menu">
                    <li class="sub-label">Primary</li>
                    <li><a href="index.html?class=1">Class 1</a></li>
                    <li><a href="index.html?class=2">Class 2</a></li>
                    <li><a href="index.html?class=3">Class 3</a></li>
                    <li><a href="index.html?class=4">Class 4</a></li>
                    <li><a href="index.html?class=5">Class 5</a></li>
                    <li class="sub-label">Secondary</li>
                    <li><a href="index.html?class=6">Class 6</a></li>
                    <li><a href="index.html?class=7">Class 7</a></li>
                    <li><a href="index.html?class=8">Class 8</a></li>
                    <li><a href="index.html?class=9">Class 9</a></li>
                    <li><a href="index.html?class=10">Class 10</a></li>
                    <li class="sub-label">Higher Secondary</li>
                    <li><a href="index.html?class=11">Class 11</a></li>
                    <li><a href="index.html?class=12">Class 12</a></li>
                </ul>
            </li>
            <li><a href="about.html">About</a></li>
        </ul>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});