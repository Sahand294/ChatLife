// ChatLife — signup page
(function () {
  const form = document.getElementById("signup-form");
  const msg = document.getElementById("auth-msg");
  const pw = document.getElementById("signup-password");
  const bar = document.getElementById("pw-meter-bar");
  const hint = document.getElementById("pw-hint");
  if (!form) return;

  function strength(p) {
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(s, 4);
  }
  const labels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
  const colors = ["#ff6b6b", "#ff9f43", "#ffd93d", "#7cf0ff", "#b6ff3c"];

  pw.addEventListener("input", function () {
    const s = strength(pw.value);
    bar.style.width = (pw.value ? (s + 1) * 20 : 0) + "%";
    bar.style.background = colors[s];
    hint.textContent = pw.value ? labels[s] + " password" : "Use 8+ characters with a mix of letters, numbers & symbols.";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const terms = data.get("terms");

    msg.classList.remove("error", "success");

    if (name.length < 2) return fail("Please enter your full name.");
    if (!email.includes("@")) return fail("Please enter a valid email.");
    if (password.length < 8) return fail("Password must be at least 8 characters.");
    if (!terms) return fail("Please accept the Terms to continue.");

    const btn = form.querySelector(".auth-submit");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Creating your account…";

    setTimeout(function () {
      try {
        localStorage.setItem(
          "chatlife:user",
          JSON.stringify({ name: name, email: email, at: Date.now() })
        );
      } catch (_) {}
      msg.textContent = "Welcome to ChatLife! Redirecting…";
      msg.classList.add("success");
      setTimeout(function () {
        window.location.href = "/conversations.html";
      }, 700);
      btn.disabled = false;
      btn.textContent = original;
    }, 800);
  });

  function fail(text) {
    msg.textContent = text;
    msg.classList.add("error");
  }

  document.querySelectorAll(".auth-social").forEach(function (b) {
    b.addEventListener("click", function () {
      msg.classList.remove("error");
      msg.classList.add("success");
      msg.textContent = "Social sign-up is a demo on this static site.";
    });
  });
})();
