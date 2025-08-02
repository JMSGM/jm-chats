const socket = io('http://localhost:3000');
const messageContainer = document.getElementById("chat-bubble")
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('new-message', data => {
  appendMessage(data);
});

messageForm.addEventListener('submit', e=>{
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('user-message', message)
  messageInput.value = '';
});

function appendMessage(message){
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}