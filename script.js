// EliteStaff - Main JavaScript

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {

  if (document.body.classList.contains('standalone-page') && !window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Don't prevent default for links with just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active state to navigation on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // Mobile menu toggle with error handling
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Make service cards open their detail pages reliably when the media area is clicked
  const serviceMediaCards = document.querySelectorAll('.service-card-media[data-href]');
  serviceMediaCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('a.btn-outline')) {
        return;
      }

      const href = this.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });

  if (hamburger && mobileMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow navigation to happen
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside nav
    document.addEventListener('click', function(e) {
      if (!e.target.closest('nav')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });

    console.log('Mobile menu initialized successfully');
  } else {
    console.warn('Mobile menu elements not found. Mobile menu will not work.');
    if (!hamburger) console.warn('Hamburger element with id="hamburger" not found');
    if (!mobileMenu) console.warn('Mobile menu element with id="mobileMenu" not found');
  }

  console.log('EliteStaff site loaded successfully');
});
