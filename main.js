document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    // Add close button to mobile menu
    const closeButton = document.createElement('button');
    closeButton.className = 'close-menu-btn';
    closeButton.innerHTML = '×';
    navbarCollapse.appendChild(closeButton);

    // Function to open menu
    function openMenu() {
        navbarCollapse.classList.add('show');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
        // Force a reflow to ensure the menu is visible
        navbarCollapse.offsetHeight;
    }

    // Function to close menu
    function closeMenu() {
        navbarCollapse.classList.remove('show');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    // Toggle mobile menu
    navbarToggler.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navbarCollapse.classList.contains('show')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close mobile menu
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
    });

    // Close menu when clicking on overlay
    overlay.addEventListener('click', (e) => {
        if (navbarCollapse.classList.contains('show')) {
            closeMenu();
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarCollapse.classList.contains('show') && 
            !navbarCollapse.contains(e.target) && 
            !navbarToggler.contains(e.target)) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Initialize Google Maps
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        console.error('Google Maps API is not available.');
    }
});

// Function to initialize Google Map
function initMap() {
    const location = { lat: 16.8567239, lng: 96.1214962 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Scroll to Top Functionality
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}

document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}); 