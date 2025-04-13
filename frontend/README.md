# Grok-Inspired Chat Interface

A modern, responsive chat interface inspired by Grok AI, built with vanilla HTML, CSS, and JavaScript. This lightweight implementation can be easily integrated with your existing bot or AI backend.

## Features

- **Modern Dark Theme UI** - Clean, dark-themed interface inspired by Grok AI
- **Responsive Design** - Works seamlessly on mobile and desktop devices
- **Message Display** - Distinct styling for user and bot messages
- **Typing Indicator** - Animated typing indicator when the bot is "thinking"
- **Thought Bubbles** - Unique "thought" feature that shows the bot's thinking process
- **Deep Search Mode** - Special mode for more comprehensive responses
- **Suggested Topic Buttons** - Quick-access buttons for common topics
- **Timestamp Display** - Time indicators for all messages
- **Smooth Animations** - Fade-in effects and smooth scrolling
- **Ready for Integration** - Easy connection points for your bot backend

## Files

- `index.html` - Structure of the Grok-inspired chat interface
- `styles.css` - Comprehensive styling with dark theme and responsive design
- `script.js` - JavaScript functionality including thought bubbles and deep search
- `grok-logo.svg` - SVG logo for the interface

## Installation

1. Clone or download this repository
2. Open `index.html` in a web browser to see the chat interface in action
3. No build process or dependencies required!

## How to Use

1. Open `index.html` in a web browser to see the basic chat interface
2. Type a message in the input field and press Enter or click the send button
3. Try the "Think" button to see the thought bubble feature in action
4. Try the "DeepSearch" button for more comprehensive responses
5. To integrate with your bot:
   - Locate the `connectToYourBot()` function in `script.js`
   - Replace the placeholder code with your actual bot API integration
   - Customize the styling in `styles.css` to match your brand

## Integration Points

The main integration points are in the `script.js` file:

- `generateBotResponse()` - Replace with your bot's standard response generation
- `generateDeepSearchResponse()` - Replace with your bot's deep search functionality
- `connectToYourBot()` - Replace with your API connection code

## Customization

You can easily customize:

- Colors and styling in `styles.css`
- Default welcome message in `index.html`
- Suggested topics/feature buttons in `index.html`
- Bot response logic in `script.js`
- Thought bubble content and timing

## Browser Compatibility

This interface works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Preview

To see a live preview, simply open the `index.html` file in your browser or serve the files using a local server.

## License

Feel free to use and modify this chat interface for your projects. Attribution is appreciated but not required.