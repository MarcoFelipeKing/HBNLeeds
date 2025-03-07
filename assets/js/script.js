// script.js

// Tailwind CSS custom colors
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          hbnGreen: '#4e9317',
          hbnPurple: '#8360a9',
          hbnGray: '#808184',
          hbnYellow: '#ffca29',
          hbnBlue: '#3e95dd',
        }
      }
    }
  };
}

// Mobile menu toggle functionality
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.site-nav ul');

if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('nav-open');
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute('href'));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form validation (only if contact form exists)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!nameInput.value.trim()) {
      alert('Please enter your name.');
      e.preventDefault();
    } else if (!validateEmail(emailInput.value)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
    }
  });
}

// Helper function for email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Scroll-to-top button functionality
const scrollTopBtn = document.getElementById('scrollToTopBtn');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.remove('hidden');
    } else {
      scrollTopBtn.classList.add('hidden');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dark mode toggle (only if implemented)
const toggleBtn = document.getElementById('theme-toggle');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}