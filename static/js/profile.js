// ChatLife — profile page
(function () {
  const KEY = "chatlife:profile";

  const defaults = {
    name: "Maya Anderson",
    handle: "@maya",
    bio: "Product designer obsessed with small details. I build interfaces that feel calm, fast and a little bit magical. Coffee, type, and tiny animations.",
    email: "maya@chatlife.com",
    location: "Lisbon, Portugal",
    pronouns: "she / her",
    joined: "May 2026",
    presence: "Active now",
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign({}, defaults, JSON.parse(raw));
    } catch (_) {}
    // Pull from signup/login if present
    try {
      const u = JSON.parse(localStorage.getItem("chatlife:user") || "null");
      if (u) {
        return Object.assign({}, defaults, {
          name: u.name || defaults.name,
          email: u.email || defaults.email,
          handle: u.email ? "@" + u.email.split("@")[0] : defaults.handle,
        });
      }
    } catch (_) {}
    return defaults;
  }

  function save(p) {
    localStorage.setItem(KEY, JSON.stringify(p));
  }

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  const fields = ["name", "handle", "bio", "email", "location", "pronouns", "presence", "joined"];


  function render() {


  }
  render();

  // Edit modal
  const modal = document.getElementById("edit-modal");
  const password = document.getElementById("edit-password");

  function openModal() {

    console.log("open")
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
    function openPassword() {

    console.log("open")
    password.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closePassword() {
    password.hidden = true;
    document.body.style.overflow = "";
  }
console.log(password)
  document.getElementById("profile-edit-btn").addEventListener("click", openModal);
  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.getElementById("password-edit").addEventListener("click", openPassword);
  document.getElementById("password-close").addEventListener("click", closePassword);
  password.addEventListener("click", (e) => { if (e.target === password) closePassword(); });


  document.getElementById("profile-message-btn").addEventListener("click", () => {
    window.location.href = "/conversations.html";
  });
})();
