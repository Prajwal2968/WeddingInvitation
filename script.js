
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const openButton = document.getElementById("openInvitation");
  const mainPage = document.getElementById("mainPage");

  const welcomeParticles = document.getElementById("welcomeParticles");
  const mainPetals = document.getElementById("petals");
  const celebrationPetals = document.getElementById("celebrationPetals");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let invitationOpened = false;

  document.body.classList.add("cover-open");

  // Create falling petals
  function createPetals(container, count, className) {
    if (!container || reducedMotion) return;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");

      petal.className = className;
      petal.style.left = Math.random() * 100 + "%";

      petal.style.animationDuration =
        (13 + Math.random() * 15) + "s";

      petal.style.animationDelay =
        (-Math.random() * 25) + "s";

      const size = 7 + Math.random() * 9;

      petal.style.width = size + "px";
      petal.style.height = (size * 1.5) + "px";

      petal.style.opacity =
        (0.25 + Math.random() * 0.45).toString();

      container.appendChild(petal);
    }
  }

  // Opening-cover petals
  createPetals(welcomeParticles, 15, "cover-petal");

  // Open invitation
  openButton.addEventListener("click", () => {
    if (invitationOpened) return;

    invitationOpened = true;
    openButton.disabled = true;

    welcomeScreen.classList.add("leaving");

    function revealMainPage() {
      welcomeScreen.remove();

      mainPage.classList.add("visible");
      mainPage.setAttribute("aria-hidden", "false");

      document.body.classList.remove("cover-open");
      document.body.style.height = "auto";
      document.body.style.overflow = "visible";
      document.documentElement.style.overflowY = "auto";

      window.scrollTo(0, 0);

      // Petals on the second-page image
      createPetals(mainPetals, 16, "petal");

      // Petals continue throughout the rest of the website
      createPetals(celebrationPetals, 32, "petal");

      startScrollAnimations();
    }

    if (reducedMotion) {
      revealMainPage();
    } else {
      window.setTimeout(revealMainPage, 1000);
    }
  });

  // Reveal sections as the visitor scrolls
  function startScrollAnimations() {
    const elements = document.querySelectorAll(
      ".reveal, .gallery-grid img"
    );

    if (
      !("IntersectionObserver" in window) ||
      reducedMotion
    ) {
      elements.forEach(element => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });
  }
});
