const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveSection() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // If no section is active (pages without section IDs), keep existing nav active state
  if (!currentSection) return;

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveSection);
window.addEventListener("load", setActiveSection);


// --- Inline expand/collapse for service cards (Apple-style) ---
(() => {
  const cards = document.querySelectorAll('.service-card');
  let expandedCard = null;

  function collapse(card) {
    if (!card) return;
    card.classList.remove('expanded');
    const toggle = card.querySelector('.card-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    // remove any inline reveal-height so it falls back to CSS default
    card.style.removeProperty('--reveal-height');
    expandedCard = null;
  }

  function expand(card) {
    if (!card) return;
    if (expandedCard && expandedCard !== card) collapse(expandedCard);
    card.classList.add('expanded');
    const toggle = card.querySelector('.card-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    // set reveal height so expanded content is fully visible (no clipping)
    const content = card.querySelector('.expanded-content');
    if (content) {
      // use scrollHeight to include content padding; add small buffer
      const h = content.scrollHeight + 8;
      card.style.setProperty('--reveal-height', `${h}px`);
    }
    // scroll expanded card into view nicely
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    expandedCard = card;
  }

  cards.forEach(card => {
    const toggle = card.querySelector('.card-toggle');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('expanded')) collapse(card); else expand(card);
      });
    }

    // allow clicking the card image or heading to also expand
    card.addEventListener('click', (e) => {
      // ignore clicks on buttons/links inside the card
      if (e.target.closest('button') || e.target.closest('a')) return;
      if (card.classList.contains('expanded')) collapse(card); else expand(card);
    });
  });

  // collapse on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedCard) collapse(expandedCard);
  });
})();

// --- Flip cards on contact page: click to flip-up front/back ---
(() => {
  const cards = document.querySelectorAll('.info-card');

  cards.forEach(card => {
    const inner = card.querySelector('.info-card-inner');
    const closeBtn = card.querySelector('.close-back');

    // toggle on card click, ignore clicks on form elements or links/buttons
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button.close-back') || e.target.closest('input') || e.target.closest('textarea')) return;
      card.classList.toggle('flipped');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('flipped');
      });
    }
  });

  // close all flipped cards on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.info-card.flipped').forEach(c => c.classList.remove('flipped'));
  });
})();
