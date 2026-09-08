document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile menu ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu && mobileClose) {
    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (mobileMenu.classList.contains('open')) closeMenu();
        closeLightbox();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── Subtle scroll reveal ───────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Lightbox for portfolio ─────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxUrl = document.getElementById('lightboxUrl');
  const lightboxDesktop = document.getElementById('lightboxDesktop');
  const lightboxMobile = document.getElementById('lightboxMobile');
  const lightboxCloseBtn = document.getElementById('lightboxClose');

  function setPreview(container, src, alt) {
    if (!container) return;
    container.innerHTML = '';

    if (!src) {
      container.textContent = 'Preview unavailable';
      return;
    }

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Website preview';
    img.loading = 'eager';
    img.addEventListener('error', function () {
      container.innerHTML = '<span>Preview unavailable</span>';
    });
    container.appendChild(img);
  }

  function openLightbox(title, url, desktopImage, mobileImage) {
    if (!lightbox) return;

    lightboxTitle.textContent = title;
    lightboxUrl.textContent = url.replace(/^https?:\/\//, '');
    lightboxUrl.href = url.startsWith('http') ? url : 'https://' + url;

    setPreview(
      lightboxDesktop,
      desktopImage,
      title + ' desktop website preview'
    );
    setPreview(
      lightboxMobile,
      mobileImage,
      title + ' mobile website preview'
    );

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.work-visual[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(
        el.dataset.title || 'Project',
        el.dataset.url || '#',
        el.dataset.desktopImage || '',
        el.dataset.mobileImage || ''
      );
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ── Contact form (Formspree) ───────────────── */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (form && statusEl && submitBtn) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#f87171';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Please fill in all required fields.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.className = 'form-status';
      statusEl.textContent = '';

      try {
        const response = await fetch('https://formspree.io/f/xlgkbnkl', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (response.ok) {
          statusEl.className = 'form-status success';
          statusEl.textContent = "✓ Message sent. We'll get back to you within one business day.";
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Something went wrong. Please email info@backgen.co.za or call 078 300 4622.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
      }
    });
  }

});
