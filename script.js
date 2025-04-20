// Use passive event listeners for better scroll performance
document.addEventListener('DOMContentLoaded', () => {
  // Add passive scroll listeners where possible
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      }
    }, { passive: false }); // Can't be passive because we're calling preventDefault
  });
});

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');

  // Use requestAnimationFrame to avoid layout thrashing
  requestAnimationFrame(() => {
    if (navLinks.classList.contains('show')) {
      // Enable outside click listener
      document.addEventListener('click', outsideClickListener);
    } else {
      document.removeEventListener('click', outsideClickListener);
    }
  });
}

function outsideClickListener(e) {
  const navLinks = document.getElementById('navLinks');
  const burger = document.querySelector('.burger');

  if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove('show');
    document.removeEventListener('click', outsideClickListener);
  }
}

function showAlert(serviceName) {
  const subject =
    serviceName === 'Hiring Opportunity'
      ? 'I wanna hire you'
      : `I want to avail services regarding ${serviceName}`;
  window.location.href = `mailto:pratikkumardewan@gmail.com?subject=${encodeURIComponent(subject)}`;
}

// Add IntersectionObserver for lazy loading elements (improves performance)
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px 50px 0px' // Start loading when within 50px of viewport
  });
  
  // Apply to sections to improve performance
  document.querySelectorAll('.info-section, .service-item').forEach(el => {
    observer.observe(el);
  });
});
