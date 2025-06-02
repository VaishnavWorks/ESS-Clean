// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  mobileMenu.setAttribute('aria-hidden', expanded);
  // Manage focusability of menu items
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.tabIndex = expanded ? -1 : 0;
  });
});

// Typed Text Effect
const typedTextEl = document.querySelector('.typed-text');
const phrases = [
  "Back Office Solutions",
  "General Trading",
  "Expert Consultancy",
  "Tailored Business Support",
];
let phraseIndex = 0;
let letterIndex = 0;
let typingDelay = 120;
let erasingDelay = 60;
let newPhraseDelay = 2000;

function type() {
  if (letterIndex < phrases[phraseIndex].length) {
    typedTextEl.textContent += phrases[phraseIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newPhraseDelay);
  }
}

function erase() {
  if (letterIndex > 0) {
    typedTextEl.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    phraseIndex++;
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

// Start typing on DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (phrases.length) setTimeout(type, 1000);
});

// Contact Form Validation & Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const phone = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
  contactForm.reset();
});
// Testimonials Carousel Logic
const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function cycleTestimonials() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}
setInterval(cycleTestimonials, 6000); // change every 6 seconds
showTestimonial(testimonialIndex);

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 400) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll-triggered fade-in animation using Intersection Observer
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
let activeProduct = null;

  function showProductDetail(id) {
    const detail = document.getElementById(id);

    if (!detail) return;

    if (activeProduct === id) {
      detail.style.display = 'none';
      activeProduct = null;
    } else {
      // Hide all other details
      document.querySelectorAll('.product-detail').forEach(el => el.style.display = 'none');

      // Show selected detail
      detail.style.display = 'block';
      activeProduct = id;

      // Scroll smoothly to product detail (👇 BELOW the product grid)
      setTimeout(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Delay ensures it's visible before scroll
    }
  }