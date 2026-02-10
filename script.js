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

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveSection);
window.addEventListener("load", setActiveSection);

// --- Service modals: toggle small info windows on card click ---
(() => {
  const serviceCards = document.querySelectorAll('.service-card[data-modal]');
  let activeModal = null;

  function openModal(modal) {
    if (!modal) return;
    if (activeModal && activeModal !== modal) closeModal(activeModal);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    activeModal = modal;
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (activeModal === modal) activeModal = null;
  }

  serviceCards.forEach(card => {
    const modalId = card.dataset.modal;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    card.addEventListener('click', () => {
      if (modal.classList.contains('open')) closeModal(modal);
      else openModal(modal);
    });

    // close when clicking outside window (overlay)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });
})();
