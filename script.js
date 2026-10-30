
document.addEventListener("DOMContentLoaded", () => {

  // Respect the visitor's motion preference
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  // =====================================
  // FLOATING FLOWER PETALS
  // =====================================

  const petalContainer = document.getElementById("petals");

  if (!reducedMotion && petalContainer) {

    const totalPetals = window.innerWidth < 600 ? 10 : 20;

    for (let i = 0; i < totalPetals; i++) {

      const petal = document.createElement("span");

      petal.classList.add("petal");

      petal.style.left = Math.random() * 100 + "%";

      petal.style.animationDuration =
        (14 + Math.random() * 16) + "s";

      petal.style.animationDelay =
        (-Math.random() * 25) + "s";

      petal.style.opacity =
        (0.25 + Math.random() * 0.35).toString();

      petal.style.scale =
        (0.6 + Math.random() * 0.8).toString();

      petalContainer.appendChild(petal);
    }

  }


  // =====================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll(
    ".main-photo, .story-text, .event, .venue-card, .gallery-grid img"
  );

  if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }

});
