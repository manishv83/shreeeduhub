/**
 * SHREE VANI TUTORIAL - STOREFRONT ENGINE
 */

function renderProducts(filterType, filterValue) {
    const grid = document.getElementById('dynamic-product-grid');
    if (!grid) return; 
    
    grid.innerHTML = ''; 

    if (typeof storefrontDatabase === 'undefined') {
        console.error("Store database not found!");
        return;
    }

    storefrontDatabase.forEach(product => {
        let isMatch = false;

        // 1. ALL CASE
        if (filterValue === 'all') {
            isMatch = true;
        } 
        // 2. CLASS/CATEGORY CASE (Now supports both strings and arrays)
        else if (filterType === 'class') {
            if (Array.isArray(product.category)) {
                isMatch = product.category.includes(filterValue);
            } else {
                isMatch = product.category === filterValue;
            }
        } 
        // 3. SUBJECT CASE
        else if (filterType === 'subject') {
            isMatch = product.subjects && product.subjects.includes(filterValue);
        }

        if (isMatch) {
            const card = document.createElement('div');
            card.className = 'product-card animate-pop';
            card.innerHTML = `
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.desc}</p>
                <a href="${product.link}" target="_blank" class="amazon-btn">View on Amazon</a>
            `;
            grid.appendChild(card);
        }
    });

    // Empty State Check
    if (grid.innerHTML === '') {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px;">
            <h3>📚 Updates in progress</h3>
            <p>We are adding more ${filterValue} resources soon.</p>
        </div>`;
    }
}

// Combine everything into ONE initialization function
const initializeStorefront = () => {
    // 1. Setup Tab Click Handlers
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const type = e.target.getAttribute('data-filter'); 
            const value = e.target.getAttribute('data-value'); 
            renderProducts(type, value);
        });
    });

    // 2. Setup Back to Top Logic
    const mybutton = document.getElementById("backToTop");
    if (mybutton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        });

        mybutton.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // 3. Handle Initial Load & Deep Links
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');

    if (cat) {
        renderProducts('class', cat);
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(btn.getAttribute('data-value') === cat) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    } else {
        // FORCE RENDER ALL ON START
        renderProducts('class', 'all');
    }
};

// Start the engine
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStorefront);
} else {
    initializeStorefront();
}