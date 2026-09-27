// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Desktop & Mobile)
  const themeToggleBtns = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
  const currentTheme = localStorage.getItem("theme");

  function applyThemeLabel(isDark) {
    themeToggleBtns.forEach((btn) => {
      btn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    });
  }

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    applyThemeLabel(true);
  }

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      applyThemeLabel(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });

  // 2. Hamburger Menu Listener
  const hamburgerIcon = document.getElementById("hamburger-icon");
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }

  // 3. Typing Effect Animation
  const typingTextElement = document.getElementById("typing-text");
  const roles = [
    "Frontend Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "JavaScript Developer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextTimeout = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      nextTimeout = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextTimeout = 500;
    }

    setTimeout(typeEffect, nextTimeout);
  }

  typeEffect();

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      projectCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // 5. Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formStatus) {
        formStatus.style.color = document.body.classList.contains("dark-mode")
          ? "#4caf50"
          : "green";
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
      }
      contactForm.reset();
    });
  }

  // 6. Back to Top Button & Scroll Active Links
  const backToTopBtn = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .menu-links a");

  window.addEventListener("scroll", () => {
    if (backToTopBtn) {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active-link");
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});