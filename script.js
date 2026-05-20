// === PAUNCHAAR RESTAURANT - 3D INTERACTIONS ===

document.addEventListener('DOMContentLoaded', () => {

  // --- Header shrink on scroll ---
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // --- Mobile nav toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const closeNav = document.getElementById('closeNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.add('active'));
    closeNav.addEventListener('click', () => mobileNav.classList.remove('active'));
    mobileNav.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('active'));
    });
  }

  // --- Scroll reveal (IntersectionObserver) ---
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // --- 3D Tilt on menu cards ---
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  // --- Animated stat counters ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsCounted = false;
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(num => {
            const target = parseInt(num.dataset.target);
            const duration = 2000;
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              num.textContent = current.toLocaleString() + (target >= 1000 ? '+' : target === 4 ? '.8' : '+');
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          });
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  // --- Parallax floating elements on mouse move ---
  const hero = document.querySelector('.hero');
  const floats = document.querySelectorAll('.hero-float');
  if (hero && floats.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      floats.forEach((el, i) => {
        const depth = (i + 1) * 15;
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, ${depth}px) rotate3d(1,1,0,${x * 20}deg)`;
      });
    });
  }

  // --- 3D About image on scroll ---
  const aboutImg = document.querySelector('.about-img-inner');
  if (aboutImg) {
    window.addEventListener('scroll', () => {
      const rect = aboutImg.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const rotateY = (progress - 0.5) * 12;
        aboutImg.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
