// ============================================================
// PIXIE — DS Vedanta Academy AI Study Buddy
// Powered by Groq API (llama-3.3-70b-versatile)
// ============================================================

const PIXIE_API_KEY = "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";

const PIXIE_SYSTEM_PROMPT = `You are Pixie, a warm and friendly AI study buddy for DS Vedanta Academy, a coaching centre in Sindri, Dhanbad run by Deeptanu Sir.

Your job is to help Class 7, 8, 9 and 10 students with their studies. You only answer questions related to their syllabus — Science, Mathematics, Social Science, and English — for CBSE, ICSE, and JAC boards.

Your personality:
- You are cheerful, encouraging, and patient like a friendly senior student
- You use simple language that young students can easily understand
- You explain things step by step
- You use emojis occasionally to feel warm and friendly (not too many)
- You celebrate when a student understands something
- You always end your answer with "Does that make sense? 😊" or "Hope that helps! Any more doubts? 😊"
- You never make a student feel bad for asking a simple question

If a student asks something that is too complex to explain properly in chat, say something like:
"This one really needs a proper explanation with diagrams — I'd suggest asking Deeptanu Sir in your next class, he'll make it crystal clear! 📚"

If a student asks something completely off-topic (not related to Class 7-10 studies), gently say:
"I'm best at helping with Science, Maths, SST and English for your board exams! What subject can I help you with? 😄"

Always be kind, never rude, and make every student feel welcome and confident.`;

// ── STYLES ──────────────────────────────────────────────────
const pixieStyles = `
  #pixie-btn {
    position: fixed;
    bottom: 10rem;
    right: 2rem;
    z-index: 999;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a9e8f, #2dbdac);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(26,158,143,0.4);
    cursor: pointer;
    border: none;
    transition: transform 0.25s, box-shadow 0.25s;
    animation: pixie-pulse 2.5s infinite;
  }
  #pixie-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 28px rgba(26,158,143,0.6);
    animation: none;
  }
  #pixie-btn svg {
    width: 28px;
    height: 28px;
    fill: #fff;
  }
  .pixie-tooltip {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    background: #1a2e2c;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.35rem 0.8rem;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  #pixie-btn:hover .pixie-tooltip {
    opacity: 1;
  }
  @keyframes pixie-pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(26,158,143,0.4); }
    50% { box-shadow: 0 4px 32px rgba(26,158,143,0.75), 0 0 0 8px rgba(26,158,143,0.12); }
  }
  #pixie-panel {
    position: fixed;
    bottom: 7rem;
    right: 2rem;
    z-index: 1000;
    width: 340px;
    height: 480px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 12px 48px rgba(26,158,143,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Plus Jakarta Sans', sans-serif;
    border: 1.5px solid #c8e6e2;
  }
  #pixie-panel.open {
    display: flex;
  }
  #pixie-header {
    background: linear-gradient(135deg, #1a9e8f, #2dbdac);
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #pixie-header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  #pixie-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  #pixie-header-info h4 {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }
  #pixie-header-info span {
    color: rgba(255,255,255,0.8);
    font-size: 0.72rem;
  }
  #pixie-close {
    background: rgba(255,255,255,0.2);
    border: none;
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  #pixie-close:hover {
    background: rgba(255,255,255,0.35);
  }
  #pixie-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #f4faf9;
  }
  #pixie-messages::-webkit-scrollbar {
    width: 4px;
  }
  #pixie-messages::-webkit-scrollbar-thumb {
    background: #c8e6e2;
    border-radius: 4px;
  }
  .pixie-msg {
    max-width: 85%;
    padding: 0.65rem 0.9rem;
    border-radius: 14px;
    font-size: 0.85rem;
    line-height: 1.6;
    animation: msgIn 0.2s ease;
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .pixie-msg.pixie {
    background: #fff;
    color: #1a2e2c;
    border: 1.5px solid #c8e6e2;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .pixie-msg.user {
    background: linear-gradient(135deg, #1a9e8f, #2dbdac);
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .pixie-msg.typing {
    background: #fff;
    border: 1.5px solid #c8e6e2;
    align-self: flex-start;
    color: #5a7a77;
    font-style: italic;
    font-size: 0.8rem;
  }
  #pixie-input-area {
    padding: 0.8rem;
    background: #fff;
    border-top: 1.5px solid #e6f7f5;
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }
  #pixie-input {
    flex: 1;
    border: 1.5px solid #c8e6e2;
    border-radius: 50px;
    padding: 0.55rem 1rem;
    font-size: 0.85rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    color: #1a2e2c;
    background: #f4faf9;
    transition: border-color 0.2s;
  }
  #pixie-input:focus {
    border-color: #1a9e8f;
    background: #fff;
  }
  #pixie-send {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #1a9e8f;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  #pixie-send:hover {
    background: #0f6e63;
    transform: scale(1.05);
  }
  #pixie-send svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  /* ── POPUP BUBBLE ── */
  #pixie-popup {
    position: fixed;
    bottom: 13rem;
    right: 5rem;
    z-index: 1001;
    background: #fff;
    border: 1.5px solid #c8e6e2;
    border-radius: 16px 16px 4px 16px;
    padding: 0.8rem 1rem;
    max-width: 210px;
    box-shadow: 0 8px 24px rgba(26,158,143,0.15);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem;
    color: #1a2e2c;
    line-height: 1.55;
    opacity: 0;
    transform: translateY(8px) scale(0.95);
    transition: opacity 0.35s ease, transform 0.35s ease;
    pointer-events: none;
    cursor: pointer;
  }
  #pixie-popup.show {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
  }
  #pixie-popup-close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #1a9e8f;
    border: none;
    color: #fff;
    font-size: 0.65rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-family: sans-serif;
  }
  #pixie-popup-close:hover {
    background: #0f6e63;
  }
  /* tail pointing down toward Pixie button */
  #pixie-popup::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 18px;
    border: 8px solid transparent;
    border-top-color: #c8e6e2;
    border-bottom: none;
  }
  #pixie-popup::before {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 19px;
    border: 7px solid transparent;
    border-top-color: #fff;
    border-bottom: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    #pixie-panel {
      left: 1rem;
      right: 1rem;
      width: auto;
      bottom: 8rem;
    }
    #pixie-btn {
      right: 1.2rem;
      bottom: 13rem;
    }
    #pixie-popup {
      right: 4.5rem;
      bottom: 13rem;
      max-width: 180px;
    }
  }
`;

// ── BUILD UI ────────────────────────────────────────────────
function buildPixie() {
  // Inject styles
  const styleEl = document.createElement('style');
  styleEl.textContent = pixieStyles;
  document.head.appendChild(styleEl);

  // Floating button
  const btn = document.createElement('button');
  btn.id = 'pixie-btn';
  btn.setAttribute('aria-label', 'Chat with Pixie');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6L3.2 7.9l6.1-.9z"/>
    </svg>
    <span class="pixie-tooltip">Chat with Pixie, An AI Study Buddy made for Students ✨</span>
  `;
  document.body.appendChild(btn);

  // ── POPUP BUBBLE ──
  const popup = document.createElement('div');
  popup.id = 'pixie-popup';
  popup.innerHTML = `
    <button id="pixie-popup-close" aria-label="Dismiss">✕</button>
    Hi! 👋 I'm <strong>Pixie</strong>, your AI study buddy!<br>Got any doubts? Ask me anything ✨
  `;
  document.body.appendChild(popup);

  // Chat panel
  const panel = document.createElement('div');
  panel.id = 'pixie-panel';
  panel.innerHTML = `
    <div id="pixie-header">
      <div id="pixie-header-left">
        <div id="pixie-avatar">✨</div>
        <div id="pixie-header-info">
          <h4>Pixie</h4>
          <span>DS Vedanta Study Buddy</span>
        </div>
      </div>
      <button id="pixie-close" aria-label="Close Pixie">✕</button>
    </div>
    <div id="pixie-messages"></div>
    <div id="pixie-input-area">
      <input id="pixie-input" type="text" placeholder="Ask me anything about your studies..." />
      <button id="pixie-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  // ── POPUP LOGIC ──
  const POPUP_KEY = 'dsva_pixie_popup_dismissed';

  function showPopup() {
    // only show if not dismissed before
    if (localStorage.getItem(POPUP_KEY)) return;
    popup.classList.add('show');
  }

  function dismissPopup() {
    popup.classList.remove('show');
    localStorage.setItem(POPUP_KEY, '1');
  }

  // show after 5 seconds
  setTimeout(showPopup, 5000);

  // clicking ✕ closes it
  document.getElementById('pixie-popup-close').addEventListener('click', function(e) {
    e.stopPropagation();
    dismissPopup();
  });

  // clicking the bubble itself opens Pixie chat
  popup.addEventListener('click', function() {
    dismissPopup();
    btn.click();
  });

  // ── STATE ──
  const history = [];
  let isOpen = false;
  let greeted = false;

  // ── HELPERS ──
  function addMessage(text, sender) {
    const msgs = document.getElementById('pixie-messages');
    const div = document.createElement('div');
    div.className = `pixie-msg ${sender}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function removeTyping() {
    const t = document.querySelector('.pixie-msg.typing');
    if (t) t.remove();
  }

  // ── GROQ API CALL ──
  async function askPixie(userMessage) {
    history.push({ role: "user", content: userMessage });
    addMessage("Pixie is thinking... ✨", "typing");

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${PIXIE_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: PIXIE_SYSTEM_PROMPT },
              ...history
            ],
            max_tokens: 1024,
            temperature: 0.7
          })
        }
      );

      const data = await response.json();
      removeTyping();

      const reply = data?.choices?.[0]?.message?.content
        || "Hmm, I had a little trouble with that one! Could you try asking again? 😊";

      history.push({ role: "assistant", content: reply });
      addMessage(reply, "pixie");

    } catch (err) {
      removeTyping();
      addMessage("Oops! I couldn't connect right now. Please check your internet and try again 😊", "pixie");
    }
  }

  // ── OPEN / CLOSE ──
  btn.addEventListener('click', () => {
    dismissPopup();
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);

    if (isOpen && !greeted) {
      greeted = true;
      setTimeout(() => {
        addMessage("Hi there! 🌟 I'm Pixie, your study buddy at DS Vedanta Academy! Whether it's Science, Maths, SST or English — I'm here to help you understand anything. What are you stuck on today? 😊", "pixie");
      }, 300);
    }

    if (isOpen) {
      setTimeout(() => document.getElementById('pixie-input').focus(), 100);
    }
  });

  document.getElementById('pixie-close').addEventListener('click', () => {
    isOpen = false;
    panel.classList.remove('open');
  });

  // ── SEND MESSAGE ──
  async function sendMessage() {
    const input = document.getElementById('pixie-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, "user");
    await askPixie(text);
  }

  document.getElementById('pixie-send').addEventListener('click', sendMessage);
  document.getElementById('pixie-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// ── INIT ────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildPixie);
} else {
  buildPixie();
}