// ChatLife — profile completion page
(function () {
  const form = document.getElementById("complete-form");
  const msg = document.getElementById("auth-msg");
  if (!form) return;

  // Prefill from existing user if available
  try {
    const u = JSON.parse(localStorage.getItem("chatlife:user") || "null");
    if (u) {
      if (u.username) form.elements.username.value = u.username;
      if (u.gender) form.elements.gender.value = u.gender;
      if (u.birthday) form.elements.birthday.value = u.birthday;
    }
  } catch (_) {}

  function fail(text) {
    msg.textContent = text;
    msg.classList.remove("success");
    msg.classList.add("error");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const gender = String(data.get("gender") || "").trim();
    const birthday = String(data.get("birthday") || "").trim();

    msg.classList.remove("error", "success");

    if (!/^[a-zA-Z0-9_.-]{2,}$/.test(username)) return fail("Username must be 2+ chars (letters, numbers, . _ -).");
    if (!gender) return fail("Please select a gender.");
    if (!birthday) return fail("Please enter your birthday.");

    const btn = form.querySelector(".auth-submit");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Saving…";
    form.submit()
    setTimeout(function () {
      try {
        const existing = JSON.parse(localStorage.getItem("chatlife:user") || "{}");
        localStorage.setItem(
          "chatlife:user",
          JSON.stringify(Object.assign({}, existing, {
            username: username,
            gender: gender,
            birthday: birthday,
            completedAt: Date.now()
          }))
        );
      } catch (_) {}
      msg.textContent = "All set! Redirecting…";
      msg.classList.add("success");
      setTimeout(function () {
        window.location.href = "/conversations.html";
      }, 600);
      btn.disabled = false;
      btn.textContent = original;
    }, 500);
  });
})();
