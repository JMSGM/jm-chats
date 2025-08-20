document.addEventListener('DOMContentLoaded', () => {
  const messageForm = document.getElementById('send-container');
  const messageInput = document.getElementById('message-input');
  const chatBubble = document.getElementById("chat-bubble");

  if (!messageForm || !messageInput || !chatBubble) return;

  const socket = io('http://localhost:3000');
  const username = window.currentUser || 'Anonymous';

  socket.emit('load-previous-message');
  socket.on('fetched-messages', oldMessages => {
    for(let i = 0; i < oldMessages.length; i++){
      let username = oldMessages[i].username;
      let messages = oldMessages[i].message;
      //appendMessage(`${username}: ${messages}`);  
      appendUserMessage(username, messages);
    }
    appendMessage("You Joined");
    socket.emit('new-user', username);
  });



  socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`);
  });

  socket.on('new-message', data => {
    //appendMessage(`${data.username}: ${data.message}`);
    appendUserMessage(data.username, data.message);
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
  
  function appendUserMessage(name, message){
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-message')

    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');

    //name
    const nameEl = document.createElement('p');
    nameEl.className = 'msgName';
    const userNick = document.createElement('span');
    userNick.className = 'userNick';
    userNick.textContent = name;
    nameEl.appendChild(userNick);
    
    //message
    const messageEl = document.createElement('p');
    messageEl.className = 'msgText';
    const msgText = document.createElement('span');
    msgText.className = 'userNick';
    msgText.textContent = message;
    messageEl.appendChild(msgText);
    
    
    bubble.append(nameEl, msgText);
    wrapper.appendChild(bubble);
    chatBubble.appendChild(wrapper);
    chatBubble.scrollTop = chatBubble.scrollHeight;

  }

  // function messageDivider(){
  //   const divider = document.createElement('div');
  //   divider.classList.add('divider-line');

  //   const newMessagesText = document.createElement('span')
  //   newMessagesText.innerText = 'Previous messages above';
  //   divider.appendChild(newMessagesText);
  //   chatBubble.appendChild(divider);

  // }
  
});