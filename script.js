document.addEventListener("DOMContentLoaded", () => {

  const welcomeScreen = document.getElementById("welcomeScreen");
  const openButton = document.getElementById("openInvitation");
  const mainPage = document.getElementById("mainPage");

  const welcomeParticles = document.getElementById("welcomeParticles");
  const mainPetals = document.getElementById("petals");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let invitationOpened = false;

  // Prevent scrolling behind the opening cover.
  document.body.classList.add("cover-open");


  // =====================================
  // CREATE FLOATING PETALS
  // =====================================

  function createPetals(container, count, className) {

    if (!container || reducedMotion) return;

    for (let i = 0; i < count; i++) {

      const petal = document.createElement("span");

      petal.className = className;

      petal.style.left = Math.random() * 100 + "%";

      petal.style.animationDuration =
        (12 + Math.random() * 14) + "s";

      petal.style.animationDelay =
        (-Math.random() * 20) + "s";

      const size = 6 + Math.random() * 8;

      petal.style.width = size + "px";
      petal.style.height = (size * 1.5) + "px";

      petal.style.opacity =
        (0.2 + Math.random() * 0.4).toString();

      container.appendChild(petal);
    }
  }


  // Petals on the opening invitation cover.
  createPetals(welcomeParticles, 15, "cover-petal");


  // =====================================
  // OPEN THE INVITATION
  // =====================================

  openButton.addEventListener("click", () => {

    if (invitationOpened) return;

    invitationOpened = true;
    openButton.disabled = true;

    welcomeScreen.classList.add("leaving");

    function revealMainPage() {

      welcomeScreen.style.display = "none";

      mainPage.classList.add("visible");
      mainPage.setAttribute("aria-hidden", "false");

      document.body.classList.remove("cover-open");

      window.scrollTo({
        top: 0,
        behavior: "auto"
      });

      // Start petals on the wedding landing page.
      createPetals(mainPetals, 18, "petal");

      // Start scroll reveal animations.
      startScrollAnimations();
    }

    if (reducedMotion) {
      revealMainPage();
    } else {
      window.setTimeout(revealMainPage, 1100);
    }

  });


  // =====================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================

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

      element.classList.add("reveal");

      observer.observe(element);
    });

  }

});
