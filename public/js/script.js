document.addEventListener('DOMContentLoaded', () => {
  const messageForm = document.getElementById('send-container');
  const messageInput = document.getElementById('message-input');
  const chatBubble = document.getElementById("chat-bubble");

  if (!messageForm || !messageInput || !chatBubble) return;

  const socket = io('http://localhost:3000');
  const username = window.currentUser || 'Anonymous';

  appendMessage("You Joined");
  
  socket.emit('new-user', username);
  
  socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`);
  });
  socket.on('new-message', data => {
    appendMessage(`${data.username}: ${data.message}`);
  });


  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('user-message', message);
    messageInput.value = '';
  });

  function appendMessage(message) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-message');

    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    bubble.innerText = message;
    
    chatBubble.scrollTop = chatBubble.scrollHeight;
    wrapper.appendChild(bubble);
    chatBubble.appendChild(wrapper);
  }

  
});