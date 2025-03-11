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

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('[data-slide]');
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Function to change slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.opacity = '0';
    });
    
    // Update dots
    dots.forEach(dot => {
      dot.style.opacity = '0.5';
    });
    
    // Show current slide
    slides[index].style.opacity = '1';
    dots[index].style.opacity = '1';
    
    currentSlide = index;
  }
  
  // Setup click handlers for dots
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      showSlide(slideIndex);
      
      // Reset the auto-rotation timer when manually changed
      clearInterval(rotationTimer);
      rotationTimer = setInterval(nextSlide, 5000);
    });
  });
  
  // Auto-rotate slides
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slideCount) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }
  
  // Start auto-rotation
  let rotationTimer = setInterval(nextSlide, 5000);
  
  // Initialize first slide
  showSlide(0);
});