// ChatLife — Conversations page
const replies = [
  "On it — sending now ⚡",
  "Sounds good, see you there!",
  "Just dropped the file in the channel.",
  "Let's hop on a quick call?",
  "💯 love it",
];

const conversations = [
  {
    id: "maya", name: "Maya Anderson", initials: "MA",
    preview: "Right? The animations are buttery.", time: "2m", unread: 2,
    messages: [
      { from: "in",  text: "Hey! Did you see the new launch? 🚀", time: "10:21", read: true },
      { from: "out", text: "Yes — it's gorgeous. ChatLife nailed it.", time: "10:22", read: true },
      { from: "in",  text: "Right? The animations are buttery.", time: "10:23", read: true },
      { from: "out", text: "Trying it now ✨", time: "10:24", read: true },
    ],
  },
  {
    id: "design", name: "Design Squad", initials: "DS",
    preview: "Jules: pushed the new tokens 🎨", time: "14m", unread: 5,
    messages: [
      { from: "in",  text: "Jules: pushed the new tokens 🎨", time: "09:48", read: true },
      { from: "in",  text: "Let me know what you think of the radius scale.", time: "09:48", read: true },
      { from: "out", text: "Looks crisp — shipping it.", time: "09:51", read: true },
    ],
  },
  {
    id: "leo", name: "Leo Park", initials: "LP",
    preview: "Call at 4? I can demo the prototype.", time: "1h", unread: 0,
    messages: [
      { from: "in",  text: "Call at 4? I can demo the prototype.", time: "09:02", read: true },
      { from: "out", text: "Works for me 👍", time: "09:05", read: true },
    ],
  },
  {
    id: "voice", name: "Voice Room: Friday Jam", initials: "VR",
    preview: "🎙️ 3 people are live", time: "3h", unread: 0,
    messages: [{ from: "in", text: "Room is open — drop in whenever.", time: "07:30", read: true }],
  },
  {
    id: "mom", name: "Mom", initials: "MO",
    preview: "Don't forget Sunday dinner 💚", time: "Yesterday", unread: 0,
    messages: [
      { from: "in",  text: "Don't forget Sunday dinner 💚", time: "Yesterday 18:14", read: true },
      { from: "out", text: "Wouldn't miss it!", time: "Yesterday 18:20", read: true },
    ],
  },
  {
    id: "ship", name: "Ship It Channel", initials: "SI",
    preview: "Deploy succeeded ✅ v2.4.1", time: "Yesterday", unread: 0,
    messages: [{ from: "in", text: "Deploy succeeded ✅ v2.4.1", time: "Yesterday 22:11", read: true }],
  },
  {
    id: "ren", name: "Renée Okafor", initials: "RO",
    preview: "Sent the invoice over — let me know!", time: "Mon", unread: 0,
    messages: [{ from: "in", text: "Sent the invoice over — let me know!", time: "Mon 14:02", read: true }],
  },
];

function nowStamp() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

let activeId = conversations[0].id;
let query = "";

const listBody = document.getElementById("conv-list-body");
const countEl  = document.getElementById("conv-count");
const threadEl = document.getElementById("conv-thread");
const layoutEl = document.getElementById("conv-layout");
const statusEl = document.getElementById("conv-status");
const searchEl = document.getElementById("conv-search-input");

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function getActive() {
  return conversations.find((c) => c.id === activeId);
}

function filtered() {
  const q = query.toLowerCase();
  return conversations.filter(
    (c) => c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)
  );
}

function renderStatus() {
  const total = conversations.reduce((n, c) => n + (c.unread || 0), 0);
  statusEl.textContent = total > 0 ? `${total} unread message${total === 1 ? "" : "s"}.` : "All caught up.";
}

function renderList() {
  const items = filtered();
  countEl.textContent = items.length;
  listBody.innerHTML = items.map((c) => `
    <div class="conv-item ${c.id === activeId ? "active" : ""}" data-id="${c.id}">
      <div class="avatar">${c.initials}</div>
      <div class="meta">
        <div class="row1">
          <span class="name">${escapeHtml(c.name)}</span>
          <span class="time">${escapeHtml(c.time)}</span>
        </div>
        <div class="preview">${escapeHtml(c.preview)}</div>
      </div>
      ${c.unread ? `<span class="badge">${c.unread}</span>` : `<span></span>`}
    </div>
  `).join("");

  listBody.querySelectorAll(".conv-item").forEach((el) => {
    el.addEventListener("click", () => openConvo(el.dataset.id));
  });
}

// Pending attachments per conversation (cleared after send)
const pendingAttachments = {}; // { [convoId]: [{kind, name, size, url, file}] }

function getPending() {
  if (!pendingAttachments[activeId]) pendingAttachments[activeId] = [];
  return pendingAttachments[activeId];
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function renderAttachments(atts) {
  if (!atts || !atts.length) return "";
  return `<div class="attachments">` + atts.map((a) => {
    if (a.kind === "image") {
      return `<a class="att-image" href="${a.url}" target="_blank" rel="noopener">
        <img src="${a.url}" alt="${escapeHtml(a.name)}" />
      </a>`;
    }
    return `<a class="att-file" href="${a.url}" target="_blank" rel="noopener" download="${escapeHtml(a.name)}">
      <span class="att-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      </span>
      <span class="att-meta">
        <span class="att-name">${escapeHtml(a.name)}</span>
        <span class="att-sub">PDF · ${formatSize(a.size)}</span>
      </span>
    </a>`;
  }).join("") + `</div>`;
}

function renderPendingTray() {
  const tray = document.getElementById("pending-tray");
  if (!tray) return;
  const pending = getPending();
  if (!pending.length) { tray.innerHTML = ""; tray.style.display = "none"; return; }
  tray.style.display = "flex";
  tray.innerHTML = pending.map((a, i) => {
    const inner = a.kind === "image"
      ? `<img src="${a.url}" alt="" />`
      : `<div class="pending-file">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
           <span>${escapeHtml(a.name)}</span>
         </div>`;
    return `<div class="pending-chip" data-kind="${a.kind}">
      ${inner}
      <button type="button" class="pending-remove" data-i="${i}" aria-label="Remove">×</button>
    </div>`;
  }).join("");
  tray.querySelectorAll(".pending-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      const removed = pending.splice(i, 1)[0];
      if (removed) URL.revokeObjectURL(removed.url);
      renderPendingTray();
    });
  });
}

function renderThread() {
  const c = getActive();
  if (!c) return;
  threadEl.innerHTML = `
    <div class="thread-head">
      <div class="left">
        <button class="icon-btn back-btn" aria-label="Back" style="margin-right:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="avatar">${c.initials}</div>
        <div>
          <div style="font-weight:600;font-size:14px;letter-spacing:-0.01em;">${escapeHtml(c.name)}</div>
          <div style="font-size:12px;color:var(--accent);">● Active now</div>
        </div>
      </div>
      <div class="actions">
        <button class="icon-btn" aria-label="Call"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
        <button class="icon-btn" aria-label="Video"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg></button>
        <button class="icon-btn" aria-label="More"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
      </div>
    </div>
    <div class="thread-body" id="thread-body">
      <div class="thread-day">Today</div>
      ${c.messages.map((m) => {
        const hasText = m.text && m.text.trim().length > 0;
        const ticks = m.from === "out"
          ? `<span class="ticks ${m.read ? "read" : ""}" title="${m.read ? "Read" : "Sent"}">${m.read ? "✓✓" : "✓"}</span>`
          : "";
        return `<div class="bubble-row ${m.from}">
          <div class="bubble ${m.from} ${!hasText ? "bubble-media" : ""}">
            ${renderAttachments(m.attachments)}
            ${hasText ? `<div class="bubble-text">${escapeHtml(m.text)}</div>` : ""}
          </div>
          <div class="bubble-meta">
            <span class="bubble-time">${escapeHtml(m.time || "")}</span>
            ${ticks}
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="pending-tray" id="pending-tray"></div>
    <form class="thread-input" id="thread-input">
      <button type="button" class="attach-btn" id="attach-btn" aria-label="Attach files">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>
      <input type="file" id="attach-input" accept="image/*,application/pdf" multiple hidden />
      <input type="text" id="thread-text" placeholder="Message ${escapeHtml(c.name)}…" autocomplete="off" />
      <button type="submit">Send</button>
    </form>
  `;

  const body = document.getElementById("thread-body");
  body.scrollTop = body.scrollHeight;

  threadEl.querySelector(".back-btn").addEventListener("click", () => {
    layoutEl.classList.remove("show-thread");
  });

  const fileInput = document.getElementById("attach-input");
  document.getElementById("attach-btn").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files || []);
    const pending = getPending();
    files.forEach((f) => {
      const isImage = f.type.startsWith("image/");
      const isPdf = f.type === "application/pdf";
      if (!isImage && !isPdf) return;
      pending.push({
        kind: isImage ? "image" : "pdf",
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
        file: f,
      });
    });
    fileInput.value = "";
    renderPendingTray();
  });

  document.getElementById("thread-input").addEventListener("submit", onSend);
  renderPendingTray();
}

function openConvo(id) {
  activeId = id;
  const c = getActive();
  if (c) c.unread = 0;
  layoutEl.classList.add("show-thread");
  renderList();
  renderThread();
  renderStatus();
}

function previewFor(text, attachments) {
  if (text && text.trim()) return text;
  if (!attachments || !attachments.length) return "";
  if (attachments.length === 1) {
    return (attachments[0].kind === "image" ? "📷 " : "📎 ") + attachments[0].name;
  }
  return `📎 ${attachments.length} attachments`;
}

function onSend(e) {
  e.preventDefault();
  const input = document.getElementById("thread-text");
  const text = input.value.trim();
  const pending = getPending();
  if (!text && pending.length === 0) return;

  const c = getActive();
  const attachments = pending.splice(0, pending.length);
  const stamp = nowStamp();
  c.messages.push({ from: "out", text, attachments, time: stamp, read: false });
  c.preview = previewFor(text, attachments);
  c.time = "now";
  input.value = "";
  renderList();
  renderThread();

  // Mark "delivered → read" shortly after send (subtle)
  setTimeout(() => {
    const last = c.messages[c.messages.length - 1];
    if (last && last.from === "out") last.read = true;
    if (activeId === c.id) renderThread();
  }, 900);

  setTimeout(() => {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const body = document.getElementById("thread-body");
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.style.animation = "pop 0.3s forwards";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      typing.remove();
      // Reply arriving means everything before is definitely read
      c.messages.forEach((m) => { if (m.from === "out") m.read = true; });
      c.messages.push({ from: "in", text: reply, attachments: [], time: nowStamp() });
      c.preview = reply;
      c.time = "now";
      renderList();
      renderThread();
    }, 1100);
  }, 400);
}

searchEl.addEventListener("input", (e) => {
  query = e.target.value;
  renderList();
});

// ---- New chat modal ----
function initialsFor(name) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0].toUpperCase()).join("") || "?";
}
function slugId(name) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "chat";
  let id = base, n = 2;
  while (conversations.some((c) => c.id === id)) id = `${base}-${n++}`;
  return id;
}

const newChatBtn = document.getElementById("new-chat-btn");
const newChatModal = document.getElementById("new-chat-modal");
const newChatForm = document.getElementById("new-chat-form");
const newChatClose = document.getElementById("new-chat-close");
const newChatCancel = document.getElementById("new-chat-cancel");

// Directory of suggested people (autocomplete)
const directory = [
  { name: "Alex Rivera",   handle: "alex.rivera" },
  { name: "Sam Patel",     handle: "sam.p" },
  { name: "Jordan Kim",    handle: "jordan.k" },
  { name: "Riley Chen",    handle: "riley.c" },
  { name: "Taylor Brooks", handle: "tay.brooks" },
  { name: "Morgan Yu",     handle: "morgan.yu" },
  { name: "Casey Nguyen",  handle: "casey.n" },
  { name: "Jamie Foster",  handle: "jamie.f" },
  { name: "Avery Singh",   handle: "avery.s" },
  { name: "Quinn Martinez",handle: "quinn.m" },
  { name: "Sasha Volkov",  handle: "sasha.v" },
  { name: "Noa Ellis",     handle: "noa.ellis" },
  { name: "Devon Clarke",  handle: "devon.c" },
  { name: "Priya Shah",    handle: "priya.s" },
  { name: "Mateo Rossi",   handle: "mateo.r" },
];

const nameInput = document.getElementById("new-chat-name");
const suggestEl = document.getElementById("suggest-list");
let suggestIdx = -1;
let suggestItems = [];

function openNewChat() {
  newChatModal.hidden = false;
  setTimeout(() => nameInput.focus(), 0);
  renderSuggest("");
}
function closeNewChat() {
  newChatModal.hidden = true;
  newChatForm.reset();
  hideSuggest();
}
function hideSuggest() {
  suggestEl.hidden = true;
  suggestEl.innerHTML = "";
  suggestIdx = -1;
  suggestItems = [];
}
function renderSuggest(q) {
  const query = q.trim().toLowerCase();
  let items = directory.slice();
  if (query) {
    items = directory.filter(
      (p) => p.name.toLowerCase().includes(query) || p.handle.toLowerCase().includes(query)
    );
  }
  items = items.slice(0, 6).map((p) => ({
    ...p,
    existing: conversations.some((c) => c.name.toLowerCase() === p.name.toLowerCase()),
  }));
  suggestItems = items;
  suggestIdx = items.length ? 0 : -1;

  if (!items.length) {
    suggestEl.hidden = false;
    suggestEl.innerHTML = `<div class="suggest-empty">No matches — press Enter to create "${escapeHtml(q)}"</div>`;
    return;
  }
  suggestEl.hidden = false;
  suggestEl.innerHTML = items.map((p, i) => `
    <div class="suggest-item ${i === suggestIdx ? "active" : ""}" data-i="${i}">
      <div class="avatar">${initialsFor(p.name)}</div>
      <div>
        <div class="s-name">${escapeHtml(p.name)}</div>
        <div class="s-sub">@${escapeHtml(p.handle)}</div>
      </div>
      ${p.existing ? `<span class="s-existing">Open</span>` : `<span></span>`}
    </div>
  `).join("");
  suggestEl.querySelectorAll(".suggest-item").forEach((el) => {
    el.addEventListener("mousedown", (ev) => {
      ev.preventDefault();
      pickSuggest(Number(el.dataset.i));
    });
  });
}
function pickSuggest(i) {
  const p = suggestItems[i];
  if (!p) return;
  const existing = conversations.find((c) => c.name.toLowerCase() === p.name.toLowerCase());
  if (existing) {
    closeNewChat();
    openConvo(existing.id);
    return;
  }
  nameInput.value = p.name;
  hideSuggest();
  newChatForm.querySelector('textarea[name="message"]').focus();
}
nameInput.addEventListener("input", (e) => renderSuggest(e.target.value));
nameInput.addEventListener("focus", (e) => renderSuggest(e.target.value));
nameInput.addEventListener("keydown", (e) => {
  if (suggestEl.hidden || !suggestItems.length) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    suggestIdx = (suggestIdx + 1) % suggestItems.length;
    updateActive();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    suggestIdx = (suggestIdx - 1 + suggestItems.length) % suggestItems.length;
    updateActive();
  } else if (e.key === "Enter" && suggestIdx >= 0 && !nameInput.value.trim().match(new RegExp(`^${suggestItems[suggestIdx].name}$`, 'i'))) {
    e.preventDefault();
    pickSuggest(suggestIdx);
  }
});
function updateActive() {
  suggestEl.querySelectorAll(".suggest-item").forEach((el, i) => {
    el.classList.toggle("active", i === suggestIdx);
  });
}

newChatBtn.addEventListener("click", openNewChat);
newChatClose.addEventListener("click", closeNewChat);
newChatCancel.addEventListener("click", closeNewChat);
newChatModal.addEventListener("click", (e) => { if (e.target === newChatModal) closeNewChat(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !newChatModal.hidden) closeNewChat(); });

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(newChatForm);
  const name = String(fd.get("name") || "").trim();
  const message = String(fd.get("message") || "").trim();
  if (!name) return;

  const existing = conversations.find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    closeNewChat();
    openConvo(existing.id);
    return;
  }

  const stamp = nowStamp();
  const convo = {
    id: slugId(name),
    name,
    initials: initialsFor(name),
    preview: message || "Say hi 👋",
    time: "now",
    unread: 0,
    messages: message ? [{ from: "out", text: message, time: stamp, read: false, attachments: [] }] : [],
  };
  conversations.unshift(convo);
  closeNewChat();
  openConvo(convo.id);
});

renderList();
renderThread();
renderStatus();
