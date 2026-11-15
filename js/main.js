// ===== AegiSky — main.js =====

const SERVER_IP = "aegisky.cloud-ip.cc";

// Nav: background on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Copy IP
function bindCopy(buttonId, textId) {
  const box = document.getElementById(buttonId);
  const label = document.getElementById(textId);
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
    box.classList.add("copied");
    label.textContent = "Copied";
    setTimeout(() => {
      box.classList.remove("copied");
      label.textContent = "Copy";
    }, 2000);
  });
}
bindCopy("ipLine", "ipCopyText");
bindCopy("ipLineBottom", "ipCopyTextBottom");

// Live status via mcsrvstat.us
async function updateStatus() {
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
    const data = await res.json();
    if (data && data.online) {
      dot.classList.add("online");
      text.textContent = `Online — ${data.players.online}/${data.players.max} players`;
    } else {
      text.textContent = "Offline";
    }
  } catch {
    text.textContent = "Status unavailable";
  }
}
updateStatus();

// Reveal on scroll
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
document.querySelectorAll(".world, .principle, .step, .section-head").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
