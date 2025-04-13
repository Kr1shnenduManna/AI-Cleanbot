// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const welcomeScreen = document.getElementById('welcome-screen');
const deepSearchBtn = document.querySelector('.deep-search-btn');
const thinkBtn = document.querySelector('.think-btn');
const featureButtons = document.querySelectorAll('.feature-btn');

// Chat State
let isTyping = false;
let chatStarted = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Focus on input when page loads
  userInput.focus();
  
  // Add event listeners
  sendButton.addEventListener('click', handleSend);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  
  // Add event listeners to feature buttons
  featureButtons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      userInput.value = `Tell me about ${buttonText}`;
      userInput.focus();
    });
  });
  
  // Add event listeners to tool buttons
  deepSearchBtn.addEventListener('click', () => {
    if (userInput.value.trim()) {
      handleSend(true);
    }
  });
  
  thinkBtn.addEventListener('click', () => {
    if (userInput.value.trim()) {
      handleThink();
    }
  });
});

// Handle sending a message
function handleSend(isDeepSearch = false) {
  const message = userInput.value.trim();
  if (!message || isTyping) return;
  
  // Hide welcome screen if this is the first message
  if (!chatStarted) {
    welcomeScreen.style.display = 'none';
    chatStarted = true;
  }
  
  // Add user message to chat
  addMessage(message, 'user');
  
  // Clear input
  userInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Simulate bot response after delay
  setTimeout(() => {
    // Remove typing indicator
    hideTypingIndicator();
    
    // Add bot response
    const botResponse = isDeepSearch ? 
      generateDeepSearchResponse(message) : 
      generateBotResponse(message);
    addMessage(botResponse, 'bot');
  }, 1500);
}

// Handle think button click
function handleThink() {
  const message = userInput.value.trim();
  if (!message || isTyping) return;
  
  // Hide welcome screen if this is the first message
  if (!chatStarted) {
    welcomeScreen.style.display = 'none';
    chatStarted = true;
  }
  
  // Add user message to chat
  addMessage(message, 'user');
  
  // Clear input
  userInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Simulate thought process and then bot response
  setTimeout(() => {
    // Remove typing indicator
    hideTypingIndicator();
    
    // Add thought bubble
    addThoughtBubble(message);
    
    // Show typing indicator again
    showTypingIndicator();
    
    // Add bot response after thought
    setTimeout(() => {
      hideTypingIndicator();
      const botResponse = generateBotResponse(message);
      addMessage(botResponse, 'bot');
    }, 1500);
  }, 1000);
}

// Add a message to the chat
function addMessage(text, sender) {
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${sender}-message`);
  
  // Create message content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message-content');
  contentDiv.textContent = text;
  
  // Create timestamp
  const timeDiv = document.createElement('div');
  timeDiv.classList.add('message-time');
  const now = new Date();
  timeDiv.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                        now.getMinutes().toString().padStart(2, '0');
  
  // Append content and time to message
  messageDiv.appendChild(contentDiv);
  messageDiv.appendChild(timeDiv);
  
  // Add message to chat
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  scrollToBottom();
}

// Add a thought bubble to the chat
function addThoughtBubble(message) {
  // Create thought bubble element
  const thoughtDiv = document.createElement('div');
  thoughtDiv.classList.add('thought-bubble');
  
  // Create thought header
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('thought-header');
  
  const thoughtTitle = document.createElement('span');
  thoughtTitle.textContent = 'Thought for 3s';
  
  const expandLink = document.createElement('span');
  expandLink.textContent = 'Expand for details';
  
  headerDiv.appendChild(thoughtTitle);
  headerDiv.appendChild(expandLink);
  
  // Create thought content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('thought-content');
  contentDiv.textContent = `Analyzing "${message}" to provide the most accurate and helpful response...`;
  
  // Append header and content to thought bubble
  thoughtDiv.appendChild(headerDiv);
  thoughtDiv.appendChild(contentDiv);
  
  // Add thought bubble to chat
  chatMessages.appendChild(thoughtDiv);
  
  // Scroll to bottom
  scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  isTyping = true;
  
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('typing-indicator');
  typingDiv.id = 'typing-indicator';
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    typingDiv.appendChild(dot);
  }
  
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
  isTyping = false;
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll chat to bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate a bot response (placeholder - replace with your bot integration)
function generateBotResponse(userMessage) {
  // This is a placeholder function that should be replaced with your actual bot integration
  const responses = [
    "I understand you're asking about '" + userMessage + "'. Can you tell me more?",
    "That's an interesting question about '" + userMessage + "'. Let me help you with that.",
    "I'm processing your request about '" + userMessage + "'. Here's what I can tell you...",
    "Thanks for asking about '" + userMessage + "'. I'm here to assist you with that.",
    "Hey, what's up? I see you're interested in '" + userMessage + "'. Let's explore that together."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate a deep search response
function generateDeepSearchResponse(userMessage) {
  return "I've performed a deep search on '" + userMessage + "' and found some interesting information. This would typically include web search results and more detailed analysis.";
}

// Function to be replaced with your bot integration
function connectToYourBot(userMessage) {
  // Replace this function with your actual bot integration code
  // This is where you would send the user's message to your bot API
  // and handle the response
  
  // Example:
  // const response = await fetch('your-bot-api-endpoint', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message: userMessage })
  // });
  // const data = await response.json();
  // return data.botResponse;
  
  // For now, we'll just return a placeholder response
  return generateBotResponse(userMessage);
}