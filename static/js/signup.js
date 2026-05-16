// ChatLife — signup page
if (true){
console.log("yoooooooooo")
    }
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
    const firstname = String(data.get("firstname") || "").trim();
    const lastname = String(data.get("lastname") || "").trim();
    const username = String(data.get("username") || "").trim();
    const gender = String(data.get("gender") || "").trim();
    const birthday = String(data.get("birthday") || "").trim();
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const password = String(data.get("password") || "");

    msg.classList.remove("error", "success");

    if (firstname.length < 1) return fail("Please enter your first name.");
    if (lastname.length < 1) return fail("Please enter your last name.");
    if (!/^[a-zA-Z0-9_.-]{2,}$/.test(username)) return fail("Username must be 2+ chars (letters, numbers, . _ -).");
    if (!gender) return fail("Please select a gender.");
    if (!Number.isFinite(age) || age < 13 || age > 120) return fail("Please enter a valid age (13–120).");
    if (!birthday) return fail("Please enter your birthday.");
    if (password.length < 8) return fail("Password must be at least 8 characters.");

    const btn = form.querySelector(".auth-submit");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Creating your account…";
    console.log("its here!")
    form.submit()
    setTimeout(function () {
      try {
        localStorage.setItem(
          "chatlife:user",
          JSON.stringify({
            name: firstname + " " + lastname,
            firstname: firstname,
            lastname: lastname,
            username: username,
            gender: gender,
            age: age,
            birthday: birthday,
            at: Date.now()
          })
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
