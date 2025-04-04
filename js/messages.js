let currentUserId = 1;
let chats = [];
let selectedChatId = null;

document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
    loadChats();
});

function loadUsers() {
    fetch("users.json")
        .then(response => response.json())
        .then(users => {
            window.users = users;
        });
}

function loadChats() {
    fetch("chats.json")
        .then(response => response.json())
        .then(data => {
            chats = data;
            updateChatList();
        });
}

function updateChatList() {
    const chatList = document.getElementById("chat-list");
    chatList.innerHTML = "";
    chats.forEach(chat => {
        const otherParticipant = chat.participants.find(id => id !== currentUserId);
        const user = window.users.find(u => u.id === otherParticipant);
        if (user) {
            const li = document.createElement("li");
            li.textContent = user.name;
            li.onclick = () => selectChat(chat.id);
            chatList.appendChild(li);
        }
    });
}

function selectChat(chatId) {
    selectedChatId = chatId;
    const chat = chats.find(c => c.id === chatId);
    const otherParticipant = chat.participants.find(id => id !== currentUserId);
    const user = window.users.find(u => u.id === otherParticipant);
    document.getElementById("chat-title").textContent = `Chat con ${user.name}`;
    updateMessages(chat);
}

function updateMessages(chat) {
    const container = document.getElementById("message-container");
    container.innerHTML = "";
    chat.messages.forEach(msg => {
        const isSent = msg.senderId === currentUserId;
        const user = window.users.find(u => u.id === msg.senderId);
        const div = document.createElement("div");
        div.className = `message ${isSent ? "sent" : "received"}`;
        div.innerHTML = `<strong>${user.name}</strong><br>${msg.content}<br><span class="time">${new Date(msg.timestamp).toLocaleTimeString()}</span>`;
        container.appendChild(div);
    });
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    if (!selectedChatId) return;
    const input = document.getElementById("message-input");
    const content = input.value.trim();
    if (!content) return;

    const chat = chats.find(c => c.id === selectedChatId);
    const timestamp = new Date().toISOString();
    chat.messages.push({ senderId: currentUserId, content, timestamp });
    
    updateMessages(chat);
    input.value = "";

    updateChatList();
}

function startNewChat() {
    const users = window.users.filter(u => u.id !== currentUserId);
    let html = "<h3>Seleccionar destinatario</h3>";
    users.forEach(user => {
        html += `<button onclick="createNewChat(${user.id})">${user.name}</button>`;
    });
    alert(html);
}

function createNewChat(recipientId) {
    const newChat = {
        id: chats.length + 1,
        participants: [currentUserId, recipientId],
        messages: []
    };
    chats.push(newChat);
    selectChat(newChat.id);
}
