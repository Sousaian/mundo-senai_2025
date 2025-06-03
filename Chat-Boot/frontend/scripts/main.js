const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

const API_URL = 'http://localhost:3306/historico'; // Change if needed

// 🔥 Bot logic — simple keyword-based
function getBotResponse(userMsg) {
    const msg = userMsg.toLowerCase();

    if (msg.includes("hello")) return "Hello there!";
    if (msg.includes("how are you")) return "I'm just code, but I'm doing fine!";
    if (msg.includes("name")) return "I'm a simple chatbot.";
    if (msg.includes("bye")) return "Goodbye!";
    if (msg.includes("help")) return "Try saying hello or ask about me.";

    const randomReplies = [
        "Interesting...",
        "Can you explain that?",
        "I don't understand that yet.",
        "Hmm... I'm learning."
    ];
    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

// 🔥 Render message in chat
function renderMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'message user' : 'message bot';
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 🔥 Save message to backend
function saveMessage(userMsg, botMsg) {
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userMsg, botResponse: botMsg })
    })
    .catch(err => console.error('Save error:', err));
}

// 🔥 Load chat history
function loadHistory() {
    fetch(API_URL)
        .then(res => res.json())
        .then(history => {
            history.forEach(entry => {
                renderMessage(entry.userMessage, 'user');
                renderMessage(entry.botResponse, 'bot');
            });
        })
        .catch(err => console.error('Load error:', err));
}

// 🔥 Clear chat history
function clearHistory() {
    fetch(API_URL, { method: 'DELETE' })
        .then(() => {
            chatWindow.innerHTML = '';
        })
        .catch(err => console.error('Delete error:', err));
}

// 🔥 Handle send action
function handleSend() {
    const userMsg = userInput.value.trim();
    if (!userMsg) return;

    const botMsg = getBotResponse(userMsg);

    renderMessage(userMsg, 'user');
    renderMessage(botMsg, 'bot');

    saveMessage(userMsg, botMsg);

    userInput.value = '';
}

// 🔥 Event listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
clearBtn.addEventListener('click', clearHistory);

// 🔥 On load
loadHistory();
