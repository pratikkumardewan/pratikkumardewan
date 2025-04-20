function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');

  if (navLinks.classList.contains('show')) {
    // Enable outside click listener
    document.addEventListener('click', outsideClickListener);
  } else {
    document.removeEventListener('click', outsideClickListener);
  }
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
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))?.scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
  