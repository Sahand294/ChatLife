// ChatLife — login page
(function () {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("auth-msg");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    // const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    msg.classList.remove("error", "success");

    if (password.length < 6) {
      msg.textContent = "Password must be at least 6 characters.";
      msg.classList.add("error");
      return;
    }
    form.submit()
  })})
