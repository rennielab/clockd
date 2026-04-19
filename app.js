// ========== Clockd landing — light interactions ==========

// Mobile menu toggle
const burger = document.querySelector(".nav-burger");
const mobileMenu = document.getElementById("mobile-menu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    mobileMenu.hidden = !open;
    burger.setAttribute("aria-expanded", open);
  });
  mobileMenu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenu.hidden = true;
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

// Hero live timer (incrementing seconds for a little life)
const timerEl = document.getElementById("live-timer");
if (timerEl) {
  let seconds = 8 * 60 + 4;
  setInterval(() => {
    seconds += 1;
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    timerEl.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// Notify form
function handleNotify(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector("input[type=email]").value;
  // Persist locally for demo purposes
  try { localStorage.setItem("clockd_notify_email", email); } catch (_) {}
  const btn = form.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = "✓ You're on the list";
  btn.disabled = true;
  form.querySelector("input").value = "";

  const note = form.querySelector(".notify-note");
  if (note) {
    note.textContent = "Thanks — we'll email you the moment Clockd is live.";
    note.classList.add("success");
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    if (note) {
      note.textContent = "No spam. Just one email when we go live.";
      note.classList.remove("success");
    }
  }, 6000);
  return false;
}

// Contact form
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector("button");
  const note = document.getElementById("contact-note");
  btn.disabled = true;
  btn.textContent = "Sending…";
  setTimeout(() => {
    btn.textContent = "✓ Message sent";
    if (note) note.textContent = "Thanks — we'll reply within one business day from support@getclockd.com.";
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Send message →";
      if (note) note.textContent = "";
    }, 5000);
  }, 700);
  return false;
}

// Expose for inline onsubmit
window.handleNotify = handleNotify;
window.handleContact = handleContact;
