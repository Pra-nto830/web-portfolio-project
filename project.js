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

// 1. Projects Data Array
const projectsData = [
  {
    id: 1,
    title: "Project One",
    category: "fullstack",
    image: "project-1.png",
    tags: ["React", "Node.js", "CSS3"],
    github: "https://github.com/Pra-nto830",
    demo: "https://github.com/Pra-nto830",
    description: "Fullstack application with authentication, API integration, and responsive UI."
  },
  {
    id: 2,
    title: "Project Two",
    category: "frontend",
    image: "project-2.png",
    tags: ["JavaScript", "HTML5", "SASS"],
    github: "https://github.com/Pra-nto830",
    demo: "https://github.com/Pra-nto830",
    description: "Modern landing page with responsive layouts, smooth animations, and clean styling."
  }
];

// 2. Render Function
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects.map(project => `
    <div class="details-container color-container project-card" data-category="${project.category}">
      <div class="article-container">
        <img src="${project.image}" alt="${project.title}" class="project-img" />
      </div>
      <h2 class="experience-sub-title project-title">${project.title}</h2>
      <div class="tech-tags">
        ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
      <div class="btn-container">
        <button class="btn btn-color-2 project-btn" onclick="window.open('${project.github}', '_blank')">Github</button>
        <button class="btn btn-color-2 project-btn" onclick="window.open('${project.demo}', '_blank')">Live Demo</button>
      </div>
    </div>
  `).join("");
}

// 3. Dom Loaded Setup & Filter Handler
document.addEventListener("DOMContentLoaded", () => {
  // Initial Render
  renderProjects(projectsData);

  // Category Filtering Setup
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      if (category === "all") {
        renderProjects(projectsData);
      } else {
        const filteredProjects = projectsData.filter(p => p.category === category);
        renderProjects(filteredProjects);
      }
    });
  });
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = { x: null, y: null, radius: 120 };

// Resize Canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Track Mouse Movement
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Particle Constructor
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Mouse Interaction
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        this.x -= dx / 10;
        this.y -= dy / 10;
      }
    }
  }

  draw() {
    ctx.fillStyle = 'rgba(100, 116, 139, 0.6)'; // Particle color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize Particles
function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Connect Nearby Particles with Lines
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        let opacity = 1 - distance / 100;
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();