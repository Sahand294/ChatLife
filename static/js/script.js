// Interactive chat input on hero mock
const replies = [
  "On it — sending now ⚡",
  "Sounds good, see you there!",
  "Just dropped the file in the channel.",
  "Let's hop on a quick call?",
  "💯 love it",
];

const form = document.querySelector('.chat-input');
const body = document.querySelector('.chat-body');
const input = form?.querySelector('input');

if (form && body && input) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const out = document.createElement('div');
    out.className = 'bubble out';
    out.textContent = text;
    out.style.animation = 'pop 0.3s forwards';
    body.appendChild(out);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      const typing = document.createElement('div');
      typing.className = 'typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      typing.style.animation = 'pop 0.3s forwards';
      body.appendChild(typing);

      setTimeout(() => {
        typing.remove();
        const reply = document.createElement('div');
        reply.className = 'bubble in';
        reply.textContent = replies[Math.floor(Math.random() * replies.length)];
        reply.style.animation = 'pop 0.3s forwards';
        body.appendChild(reply);
        body.scrollTop = body.scrollHeight;
      }, 1100);
    }, 400);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});
