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

// ============================================
// EVENT FILTERING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initEventFilters();
});

function initEventFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  
  // Exit if not on events page
  if (filterButtons.length === 0 || eventCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button state
      updateActiveButton(filterButtons, button);
      
      // Filter events
      filterEvents(eventCards, filter);
      
      // Update URL (optional - allows sharing filtered view)
      updateURL(filter);
      
      // Update counts
      updateCounts(eventCards, filter);
    });
  });

  // Check URL for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter');
  
  if (initialFilter) {
    const targetButton = document.querySelector(`[data-filter="${initialFilter}"]`);
    if (targetButton) {
      targetButton.click();
    }
  }
}

function updateActiveButton(buttons, activeButton) {
  buttons.forEach(btn => {
    btn.classList.remove('bg-hbnBlue', 'text-white', 'shadow-md', 'active');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });
  
  activeButton.classList.remove('bg-gray-100', 'text-gray-700');
  activeButton.classList.add('bg-hbnBlue', 'text-white', 'shadow-md', 'active');
}

function filterEvents(cards, filter) {
  let visibleCount = 0;
  
  cards.forEach(card => {
    const category = card.dataset.category;
    const shouldShow = filter === 'all' || category === filter;
    
    if (shouldShow) {
      card.classList.remove('hidden');
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      
      // Staggered animation
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, visibleCount * 50);
      
      visibleCount++;
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        card.classList.add('hidden');
      }, 300);
    }
  });

  // Show "no results" message if needed
  handleNoResults(visibleCount, filter);
}

function handleNoResults(count, filter) {
  const container = document.getElementById('events-container');
  let noResultsMsg = document.getElementById('no-results-message');
  
  if (count === 0) {
    if (!noResultsMsg && container) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'text-center py-12 text-gray-500';
      noResultsMsg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-lg">No ${filter} events found.</p>
        <button onclick="document.querySelector('[data-filter=all]').click()" class="mt-4 text-hbnGreen hover:underline">
          View all events
        </button>
      `;
      container.appendChild(noResultsMsg);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

function updateCounts(cards, filter) {
  const upcomingCount = document.getElementById('upcoming-count');
  const pastCount = document.getElementById('past-count');
  
  if (!upcomingCount || !pastCount) return;

  let upcoming = 0;
  let past = 0;

  cards.forEach(card => {
    const category = card.dataset.category;
    const status = card.dataset.status;
    const matches = filter === 'all' || category === filter;
    
    if (matches) {
      if (status === 'upcoming') upcoming++;
      if (status === 'past') past++;
    }
  });

  // Animate count change
  animateCount(upcomingCount, upcoming);
  animateCount(pastCount, past);
}

function animateCount(element, newValue) {
  const currentValue = parseInt(element.textContent) || 0;
  
  if (currentValue === newValue) return;
  
  const duration = 300;
  const steps = 10;
  const stepDuration = duration / steps;
  const increment = (newValue - currentValue) / steps;
  
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const value = Math.round(currentValue + (increment * step));
    element.textContent = value;
    
    if (step >= steps) {
      clearInterval(timer);
      element.textContent = newValue;
    }
  }, stepDuration);
}

function updateURL(filter) {
  const url = new URL(window.location);
  
  if (filter === 'all') {
    url.searchParams.delete('filter');
  } else {
    url.searchParams.set('filter', filter);
  }
  
  window.history.replaceState({}, '', url);
}

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