// ===== AegiSky — main.js =====

// Navbar: sfondo allo scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Copia IP
const SERVER_IP = "aegisky.cloud-ip.cc";
document.querySelectorAll(".ip-box").forEach((box) => {
  box.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SERVER_IP;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    const hint = box.querySelector(".copy-hint");
    box.classList.add("copied");
    hint.textContent = "✅ Copiato!";
    setTimeout(() => {
      box.classList.remove("copied");
      hint.textContent = "📋 Copia";
    }, 2000);
  });
});

// Conteggio giocatori via API mcsrvstat.us
async function updatePlayerCount() {
  const el = document.getElementById("statPlayers");
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
    const data = await res.json();
    if (data && data.online) {
      el.textContent = `${data.players.online}/${data.players.max}`;
    } else {
      el.textContent = "Offline";
    }
  } catch {
    el.textContent = "—";
  }
}
updatePlayerCount();

// Animazione reveal allo scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".section-head, .card, .step, .world-card").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
