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
  let profile = load();

  function render() {
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-handle").textContent = profile.handle.startsWith("@") ? profile.handle : "@" + profile.handle;
    document.getElementById("profile-bio").textContent = profile.bio;
    document.getElementById("profile-email").textContent = profile.email;
    document.getElementById("profile-location").textContent = profile.location;
    document.getElementById("profile-pronouns").textContent = profile.pronouns;
    document.getElementById("profile-joined").textContent = profile.joined;
    document.getElementById("profile-presence").textContent = profile.presence;
    document.getElementById("profile-initials").textContent = initials(profile.name);
    document.title = profile.name + " — ChatLife";
  }
  render();

  // Edit modal
  const modal = document.getElementById("edit-modal");
  const form = document.getElementById("edit-form");

  function openModal() {
    form.elements.name.value = profile.name;
    form.elements.handle.value = profile.handle;
    form.elements.bio.value = profile.bio;
    form.elements.location.value = profile.location;
    form.elements.pronouns.value = profile.pronouns;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.getElementById("profile-edit-btn").addEventListener("click", openModal);
  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    profile = Object.assign({}, profile, {
      name: String(data.get("name") || "").trim() || profile.name,
      handle: String(data.get("handle") || "").trim() || profile.handle,
      bio: String(data.get("bio") || "").trim(),
      location: String(data.get("location") || "").trim(),
      pronouns: String(data.get("pronouns") || "").trim(),
    });
    save(profile);
    render();
    closeModal();
  });

  document.getElementById("profile-message-btn").addEventListener("click", () => {
    window.location.href = "/conversations.html";
  });
})();
