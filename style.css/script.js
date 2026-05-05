// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll animations =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  observer.observe(el);
});

// ===== Plant switch =====
function showPlant(name, desc, img, el, tags) {
  const detailsEl = document.getElementById('plantDetails');

  document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('active'));
  if (el) el.classList.add('active');

  detailsEl.style.opacity = '0';
  detailsEl.style.transform = 'translateY(10px)';

  setTimeout(() => {
    let tagsHtml = '';
    if (tags && tags.length) {
      tagsHtml = '<div class="plant-tags">' + tags.map(t =>
        '<span class="plant-tag">' + t + '</span>'
      ).join('') + '</div>';
    }

    detailsEl.innerHTML =
      '<h3>' + name + '</h3>' +
      '<p>' + desc + '</p>' +
      tagsHtml +
      '<img src="' + img + '" alt="' + name + '">';

    detailsEl.style.opacity = '1';
    detailsEl.style.transform = 'translateY(0)';
  }, 250);
}

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});