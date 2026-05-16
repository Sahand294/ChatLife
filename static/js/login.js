// ChatLife — login page
(function () {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("auth-msg");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    msg.classList.remove("error", "success");

    if (!email || !email.includes("@")) {
      msg.textContent = "Please enter a valid email address.";
      msg.classList.add("error");
      return;
    }
    if (password.length < 6) {
      msg.textContent = "Password must be at least 6 characters.";
      msg.classList.add("error");
      return;
    }

    const btn = form.querySelector(".auth-submit");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Signing in…";

    setTimeout(function () {
      try {
        localStorage.setItem(
          "chatlife:user",
          JSON.stringify({ email: email, at: Date.now() })
        );
      } catch (_) {}
      msg.textContent = "Welcome back! Redirecting…";
      msg.classList.add("success");
      setTimeout(function () {
        window.location.href = "/conversations.html";
      }, 600);
      btn.disabled = false;
      btn.textContent = original;
    }, 700);
  });

  // Social buttons (stub)
  document.querySelectorAll(".auth-social").forEach(function (b) {
    b.addEventListener("click", function () {
      msg.classList.remove("error");
      msg.classList.add("success");
      msg.textContent = "Social sign-in is a demo on this static site.";
    });
  });
})();
