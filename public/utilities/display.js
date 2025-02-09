const chatMessages = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');

function displayMessage(content, messageType) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    if (messageType === 'ai') {
        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('ai-message-avatar');
        
        const avatarImage = document.createElement('img');
        avatarImage.src = './assets/logo.svg';
        avatarImage.alt = 'AI Avatar';
        avatarImage.classList.add('avatar-image');
        
        avatarContainer.appendChild(avatarImage);
        messageContainer.appendChild(avatarContainer);
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${messageType}-message`, 'animate__animated', 'animate__fadeIn');
    messageElement.innerHTML = `<p>${content}</p>`;
    messageContainer.appendChild(messageElement);

    chatMessages.appendChild(messageContainer);

    // scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Example usage: Add event listener to send button
sendButton.addEventListener('click', () => {
    const userMessage = messageInput.value;
    if (userMessage.trim()) {
        displayMessage(userMessage, 'user');
        messageInput.value = ''; // Clear input after sending
    }
});

