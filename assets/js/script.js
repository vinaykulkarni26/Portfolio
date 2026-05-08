const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll('.navbar a[href^="#"]:not(.brand)');
const sections = document.querySelectorAll("main section, .hero");
const revealItems = document.querySelectorAll(".reveal");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

function updateActiveLink() {
  let currentId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", () => {
  updateNavbar();
  updateActiveLink();
});

updateNavbar();
updateActiveLink();
