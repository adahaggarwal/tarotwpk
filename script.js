document.addEventListener('DOMContentLoaded', () => {
  const tarotSection = document.querySelector('#tarot');
  const tarotTrigger = document.querySelector('[data-tarot-trigger]');
  const toastElement = document.querySelector('#interactionToast');
  const toast = window.bootstrap ? bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 4200 }) : null;
  const toastTitle = document.querySelector('#toastTitle');
  const toastText = document.querySelector('#toastText');
  const servicesSection = document.querySelector('#services');
  const numerologyCard = document.querySelector('[data-placeholder-card]');
  const clarityNote = document.querySelector('.hero-visual .note-bottom');
  const heroCopy = document.querySelector('.hero-copy');

  if (clarityNote && heroCopy) {
    heroCopy.appendChild(clarityNote);
    clarityNote.classList.add('clarity-note');
  }

  const showToast = (title, text) => {
    toastTitle.textContent = title;
    toastText.textContent = text;
    if (toast) toast.show();
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const createNumerologyView = () => {
    const view = document.createElement('section');
    view.id = 'numerology';
    view.className = 'tarot-section numerology-view';
    view.setAttribute('aria-hidden', 'true');
    view.innerHTML = `<div class="container section-space"><button class="service-view-back" type="button">← Back to services</button><div class="tarot-intro"><div><p class="section-kicker">A reading, made personal</p><h2>Medical <em>numerology</em></h2></div><p>Choose an area you would like to explore.</p></div><div class="row g-3 category-grid"><div class="col-lg-4"><button class="category-card category-career" type="button" data-category="Life Path"><span class="category-label">01 / Life Path</span><h3>Understand your<br><em>direction.</em></h3><p>Explore the patterns, strengths, and themes that shape the way you move through life.</p><span class="round-arrow">↗</span></button></div><div class="col-lg-4"><button class="category-card category-self" type="button" data-category="Personal Cycles"><span class="category-label">02 / Personal Cycles</span><h3>Notice your<br><em>rhythm.</em></h3><p>Reflect on changing seasons, recurring patterns, and the energy around important decisions.</p><span class="round-arrow">↗</span></button></div><div class="col-lg-4"><button class="category-card category-love" type="button" data-category="Wellness Patterns"><span class="category-label">03 / Wellness Patterns</span><h3>Listen to your<br><em>whole self.</em></h3><p>Use number-based reflection to notice habits, balance, and areas that deserve more care.</p><span class="round-arrow">↗</span></button></div></div></div>`;
    document.querySelector('#contact').before(view);
    view.querySelector('.service-view-back').addEventListener('click', () => closeServiceView(view));
    view.querySelectorAll('[data-category]').forEach((card) => {
      card.addEventListener('click', () => showToast(`${card.dataset.category} is a beautiful place to begin`, 'Your question does not need to be perfect. It just needs to be yours.'));
    });
    return view;
  };

  const closeServiceView = (view) => {
    view.classList.remove('is-open');
    view.setAttribute('aria-hidden', 'true');
    if (view === tarotSection) {
      tarotTrigger?.setAttribute('aria-expanded', 'false');
    }
    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openServiceView = (view) => {
    document.querySelectorAll('.service-view-open').forEach((openView) => {
      openView.classList.remove('service-view-open');
      openView.setAttribute('aria-hidden', 'true');
    });
    view.classList.add('is-open', 'service-view-open');
    view.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => view.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const openTarot = () => {
    tarotSection.classList.add('is-open');
    tarotSection.setAttribute('aria-hidden', 'false');
    tarotTrigger?.setAttribute('aria-expanded', 'true');
    openServiceView(tarotSection);
  };

  tarotTrigger?.addEventListener('click', openTarot);
  tarotSection.querySelector('.tarot-intro').insertAdjacentHTML('beforebegin', '<button class="service-view-back" type="button">← Back to services</button>');
  tarotSection.querySelector('.service-view-back').addEventListener('click', () => closeServiceView(tarotSection));

  document.querySelectorAll('[data-category]').forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      showToast(`${category} is a beautiful place to begin`, 'Your question does not need to be perfect. It just needs to be yours.');
    });
  });

  document.querySelectorAll('[data-question]').forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.question;
      showToast(`${category} prompt saved`, 'Keep this question close as you notice what unfolds.');
    });
  });

  document.querySelector('#tarot .questions-heading')?.remove();
  document.querySelector('#tarot .sample-grid')?.remove();

  const tarotGrid = tarotSection.querySelector('.category-grid');
  if (tarotGrid) {
    const tarotPages = [
      { category: 'Love', icon: 'love.png', image: 'love_sq.PNG', title: 'Matters of the', emphasis: 'heart.', copy: 'Explore relationships, emotions, connections, and matters of the heart.', question: 'What do I need to understand about my current relationship?' },
      { category: 'Career', icon: 'career.png', image: 'career_sq.PNG', title: 'Make your next', emphasis: 'move.', copy: 'Gain perspective on your professional path, opportunities, decisions, and career direction.', question: 'What should I know about my current career path?' },
      { category: 'Self-improvement', icon: 'self.png', image: 'self_sq.PNG', title: 'Come back to', emphasis: 'yourself.', copy: 'Reflect on personal growth, inner patterns, confidence, and the path towards becoming your best self.', question: 'What is currently holding me back from my personal growth?' }
    ];
    tarotGrid.className = 'tarot-book-shell';
    tarotGrid.innerHTML = `<div class="tarot-book" aria-live="polite"><div class="book-page book-copy-page"><img class="book-icon" src="${tarotPages[0].icon}" alt="${tarotPages[0].category} icon"><span class="book-category">01 / ${tarotPages[0].category}</span><h3>${tarotPages[0].title}<br><em>${tarotPages[0].emphasis}</em></h3><p>${tarotPages[0].copy}</p></div><div class="book-page book-image-page"><img class="book-image" src="${tarotPages[0].image}" alt="${tarotPages[0].category} tarot reading"></div></div><div class="book-controls"><button class="book-control book-previous" type="button" aria-label="Previous page">←</button><span class="book-count">Page <strong>1</strong> / 3</span><button class="book-control book-next" type="button" aria-label="Next page">→</button></div>`;
    const book = tarotGrid.querySelector('.tarot-book');
    const count = tarotGrid.querySelector('.book-count strong');
    const copyPage = tarotGrid.querySelector('.book-copy-page');
    const imagePage = tarotGrid.querySelector('.book-image-page');
    let pageIndex = 0;

    const renderBookPage = (direction = 'next') => {
      pageIndex = (pageIndex + direction + tarotPages.length) % tarotPages.length;
      const page = tarotPages[pageIndex];
      book.classList.remove('turn-next', 'turn-previous');
      void book.offsetWidth;
      book.classList.add(direction > 0 ? 'turn-next' : 'turn-previous');
      copyPage.innerHTML = `<img class="book-icon" src="${page.icon}" alt="${page.category} icon"><span class="book-category">0${pageIndex + 1} / ${page.category}</span><h3>${page.title}<br><em>${page.emphasis}</em></h3><p>${page.copy}</p>`;
      imagePage.innerHTML = `<img class="book-image" src="${page.image}" alt="${page.category} tarot reading">`;
      count.textContent = pageIndex + 1;
    };
    tarotGrid.querySelector('.book-next').addEventListener('click', () => renderBookPage(1));
    tarotGrid.querySelector('.book-previous').addEventListener('click', () => renderBookPage(-1));
  }

  const testimonialCards = [...document.querySelectorAll('.testimonial-card')];
  const testimonialCounter = document.querySelector('.testimonial-nav > span');
  let testimonialIndex = 1;

  const setTestimonial = (nextIndex) => {
    testimonialIndex = (nextIndex + testimonialCards.length) % testimonialCards.length;
    testimonialCards.forEach((card, index) => {
      card.classList.remove('testimonial-left', 'testimonial-center', 'testimonial-right', 'is-active');
      const position = (index - testimonialIndex + testimonialCards.length) % testimonialCards.length;
      if (position === 0) card.classList.add('testimonial-center', 'is-active');
      if (position === 1) card.classList.add('testimonial-right');
      if (position === 2) card.classList.add('testimonial-left');
      card.style.order = position === 0 ? 2 : position === 1 ? 3 : 1;
      if (index !== testimonialIndex) card.querySelector('video').pause();
    });
    if (testimonialCounter) testimonialCounter.innerHTML = `<strong>0${testimonialIndex + 1}</strong> / 03`;
  };

  document.querySelector('.testimonial-prev')?.addEventListener('click', () => setTestimonial(testimonialIndex - 1));
  document.querySelector('.testimonial-next')?.addEventListener('click', () => setTestimonial(testimonialIndex + 1));

  const testimonialNav = document.querySelector('.testimonial-nav');
  if (testimonialNav && !document.querySelector('.review-collage')) {
    const collage = document.createElement('div');
    collage.className = 'review-collage';
    collage.setAttribute('aria-label', 'Written client reviews');
    collage.innerHTML = Array.from({ length: 6 }, (_, index) => `<figure class="review-collage-item"><img src="${index + 1}.png" alt="Client review screenshot ${index + 1}" loading="lazy"></figure>`).join('');
    testimonialNav.insertAdjacentElement('afterend', collage);
  }

  testimonialCards.forEach((card) => {
    const video = card.querySelector('video');
    const playButton = card.querySelector('.video-play');
    const timeline = card.querySelector('.video-timeline');
    const rewind = card.querySelector('.video-rewind');
    const volume = card.querySelector('.video-volume');

    video.muted = false;
    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        card.classList.add('is-playing');
        playButton.textContent = 'Pause';
      } else {
        video.pause();
        card.classList.remove('is-playing');
        playButton.textContent = 'Play';
      }
    });
    video.addEventListener('timeupdate', () => {
      if (video.duration) timeline.value = (video.currentTime / video.duration) * 100;
    });
    video.addEventListener('ended', () => {
      playButton.textContent = 'Play';
      card.classList.remove('is-playing');
    });
    timeline.addEventListener('input', () => {
      if (video.duration) video.currentTime = (Number(timeline.value) / 100) * video.duration;
    });
    rewind.addEventListener('click', () => { video.currentTime = Math.max(0, video.currentTime - 5); });
    volume.addEventListener('click', () => {
      video.muted = !video.muted;
      volume.textContent = video.muted ? 'Mute' : 'Sound';
      volume.classList.toggle('is-muted', video.muted);
      volume.setAttribute('aria-label', video.muted ? 'Unmute testimonial' : 'Mute testimonial');
    });
  });
  setTestimonial(testimonialIndex);

  const aboutSection = document.querySelector('#about');
  const aboutCopy = aboutSection?.querySelector('.col-lg-6');
  const aboutPhoto = aboutSection?.querySelector('.about-photo');

  if (aboutCopy && !aboutCopy.querySelector('.about-more')) {
    const more = document.createElement('div');
    more.className = 'about-more';
    more.innerHTML = '<p>Every session is a quiet pause from the noise: a chance to name what you feel, notice what keeps repeating, and leave with a little more trust in your own inner voice.</p>';
    const toggle = document.createElement('button');
    toggle.className = 'about-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = 'Read a little more <span>+</span>';
    toggle.addEventListener('click', () => {
      const isOpen = more.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.innerHTML = isOpen ? 'Show a little less <span>−</span>' : 'Read a little more <span>+</span>';
    });
    const aboutLink = aboutCopy.querySelector('.dark-link');
    aboutLink?.before(toggle, more);
  }

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  const nav = document.querySelector('.site-nav');
  const trackedSections = [...document.querySelectorAll('main > section[id]')];
  const sectionLinks = [...document.querySelectorAll('.nav-link')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  trackedSections.forEach((section) => sectionObserver.observe(section));

  let ticking = false;
  const updateScrollEffects = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    nav?.classList.toggle('is-scrolled', window.scrollY > 24);
    if (aboutPhoto && aboutSection) {
      const distance = aboutSection.getBoundingClientRect().top - window.innerHeight / 2;
      aboutPhoto.style.setProperty('--about-shift', `${Math.max(-10, Math.min(10, distance * -0.015))}px`);
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });
  updateScrollEffects();

  const numerologyView = createNumerologyView();
  numerologyCard?.addEventListener('click', () => openServiceView(numerologyView));

  document.querySelectorAll('.nav-link, .navbar-brand, .nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('#mainNav');
      if (nav.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });
});
