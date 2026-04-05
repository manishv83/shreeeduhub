document.addEventListener('DOMContentLoaded', () => {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; 2026 <strong>Shree Vani Tutorial</strong>. All Rights Reserved.</p>
            <p>Designed for K-12 Interactive Learning | Patna, Bihar</p>
            
            <div class="footer-links-container">
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="storefront.html">Book Store</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                </ul>
            </div>
            
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
            
            <p class="disclosure" style="font-size: 0.75rem; color: #bdc3c7; font-style: italic; max-width: 600px; margin: 0 auto;">
                As an Amazon Associate, Shree Vani Tutorial earns from qualifying purchases. 
                This helps us keep our K-12 quizzes and notes free for all students.
            </p>
        </div>
    </footer>`;

    // Insert at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // --- SMART TAB LINKER ---
    // If we are on storefront.html, check if the URL has ?cat=secondary
    if (window.location.pathname.includes('storefront.html')) {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('cat');
        if (cat) {
            const targetTab = document.querySelector(`[data-category="${cat}"]`);
            if (targetTab) targetTab.click();
        }
    }
});