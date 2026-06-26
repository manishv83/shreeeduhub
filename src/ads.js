document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Promotional Inventory Data Map
    const promoInventory = {
        'promo-header-banner': {
            imgUrl: 'https://m.media-amazon.com/images/G/31/Events/img25/PD26_XCM_MX_Player_MOB-1136x315_V3.jpg',
            url: 'https://amzn.to/4vxPqTx',
            type: 'horizontal'
        },
        'promo-square-middle': {
            imgUrl: 'assets/images/mock-test-badge.png',
            url: '#quiz-container',
            type: 'card'
        },
        'promo-footer-banner': {
           imgUrl: 'assets/images/books-icon.png',
           url: 'storefront.html',
            type: 'horizontal'
        }
    };

   // 2. Dynamic Injection Loop
    for (const [placeholderId, promoData] of Object.entries(promoInventory)) {
        const target = document.getElementById(placeholderId);
        
        if (target) {
            const layoutClass = promoData.type === 'horizontal' ? 'promo-horizontal-strip' : 'promo-native-card';
            
            target.innerHTML = `
                <div class="promo-box ${layoutClass} edge-to-edge-card">
                    <div class="promo-content-wrapper header-padding">
                        <span class="promo-label">Sponsored Resource</span>
                                           
                    <a href="${promoData.url}" target="_blank" rel="noopener" class="promo-image-link" title="Click to view resource">
                        <div class="promo-full-image-wrap">
                            <img src="${promoData.imgUrl}" alt="${promoData.title}" class="promo-cover-img" loading="lazy">
                        </div>
                    </a>
                    
                    
            `;
        }
    }
});