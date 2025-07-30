document.addEventListener('DOMContentLoaded', function() {
    // Add js-loaded class to body and header for animations
    document.body.classList.add('js-loaded');
    document.querySelector('#header').classList.add('js-loaded');
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#header nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPage === '' || currentPage === '/' || currentPage === 'index.html') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Animate the Lumina Style heading
    const logoHeading = document.querySelector('#header .logo h1');
    if (logoHeading) {
        const text = logoHeading.textContent;
        logoHeading.innerHTML = '';
        
        // Split text into individual characters and wrap each in a span
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            span.style.animationDelay = `${i * 0.05}s`; // Stagger the animation
            span.style.setProperty('--char-index', i); // Set character index as CSS variable for color animation
            logoHeading.appendChild(span);
        }
        
        // Set up automatic animation reset every 5 seconds
        function resetAnimation() {
            const chars = logoHeading.querySelectorAll('.char');
            chars.forEach((char, index) => {
                // Reset the animation
                char.style.animation = 'none';
                char.offsetHeight; // Trigger reflow
                char.style.animation = `textReveal 0.5s forwards, colorCycle 4s infinite alternate 5s`;
                char.style.animationDelay = `${index * 0.05}s, ${5 + (index * 0.1)}s`;
            });
        }
        
        // Run the animation reset every 5 seconds
        setInterval(resetAnimation, 5000);
    }
    
    // Search functionality
    const searchIcon = document.querySelector('#header .search i');
    const searchContainer = document.querySelector('#header .search');
    
    if (searchIcon && searchContainer) {
        // Create search form if it doesn't exist
        if (!document.querySelector('#header .search-form')) {
            const searchForm = document.createElement('form');
            searchForm.className = 'search-form';
            searchForm.innerHTML = `
                <input type="text" class="search-input" placeholder="Search...">
                <button type="submit" class="search-button">Search</button>
            `;
            searchContainer.appendChild(searchForm);
        }

        // Toggle search form visibility
        searchIcon.addEventListener('click', function() {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                document.querySelector('#header .search-input').focus();
            }
        });

        // Handle search form submission
        const searchForm = document.querySelector('#header .search-form');
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.querySelector('#header .search-input').value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // Here you would typically implement actual search functionality
                searchContainer.classList.remove('active');
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.getElementById('header');
    let mobileNav;

    // Create mobile nav if it doesn't exist
    if (!document.querySelector('.mobile-nav')) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="arrivals.html">Fresh Arrivals</a></li>
                <li><a href="men.html">Gentlemen</a></li>
                <li><a href="women.html">Ladies</a></li>
                <li><a href="kids.html">Youth</a></li>
            </ul>
        `;
        document.body.insertBefore(mobileNav, header.nextSibling);
        
        // Set active link in mobile menu
        const currentPage = window.location.pathname.split('/').pop();
        const mobileLinks = mobileNav.querySelectorAll('a');
        
        mobileLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === '' || currentPage === '/' || currentPage === 'index.html') && linkHref === 'index.html') {
                link.classList.add('active');
            } else if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    } else {
        mobileNav = document.querySelector('.mobile-nav');
        
        // Set active link in mobile menu
        const currentPage = window.location.pathname.split('/').pop();
        const mobileLinks = mobileNav.querySelectorAll('a');
        
        mobileLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === '' || currentPage === '/' || currentPage === 'index.html') && linkHref === 'index.html') {
                link.classList.add('active');
            } else if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Add fade-in class to elements that should animate
    document.querySelectorAll('#hero .sidebar, #hero .main-text, #hero .hero-images img, #featured .card').forEach(el => {
        el.classList.add('fade-in');
        // Add visible class immediately to prevent content from fading away on load
        setTimeout(() => {
            el.classList.add('visible');
        }, 100); // Small delay to ensure transition works
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Show elements that are in viewport
    function showVisibleElements() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Run on load
    showVisibleElements();

    // Run on scroll
    window.addEventListener('scroll', showVisibleElements);

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(29, 53, 87, 0.9)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(168, 218, 220, 0.9), rgba(168, 218, 220, 0.7))';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileNav.classList.remove('active');
            }
        });
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        ctaButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }

    // Create placeholder images if needed
    function createPlaceholderImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src.includes('placeholder://') || img.src.includes('assets/')) {
                // Create SVG placeholder images
                const colors = ['#A8DADC', '#457B9D', '#1D3557'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${img.width || 800}" height="${img.height || 600}" viewBox="0 0 800 600">
                    <rect width="800" height="600" fill="${randomColor}" />
                    <text x="50%" y="50%" font-family="Montserrat, sans-serif" font-size="24" fill="#FFFFFF" text-anchor="middle">${img.alt || 'Lumina Style'}</text>
                </svg>
                `;
                const blob = new Blob([svgContent], {type: 'image/svg+xml'});
                img.src = URL.createObjectURL(blob);
            }
        });
    }

    // Create directory for assets if needed
    createPlaceholderImages();

    // Responsive image loading
    function loadResponsiveImages() {
        const viewportWidth = window.innerWidth;
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (viewportWidth <= 768) {
                img.src = img.getAttribute('data-src-mobile') || img.getAttribute('data-src');
            } else {
                img.src = img.getAttribute('data-src');
            }
        });
    }

    // Run on load and resize
    loadResponsiveImages();
    window.addEventListener('resize', loadResponsiveImages);
});