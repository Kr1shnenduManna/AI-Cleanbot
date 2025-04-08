const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./passport-config');
const User = require('./models/User');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.error('MongoDB error:', err));

// Authentication Routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User exists' });
    
    user = new User({ username, email, password });
    await user.save();
    
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login error' });
      res.status(200).json({ message: 'Signup success', user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login success', user: req.user });
});

// Google Auth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_DEPLOYMENT_NAME}`,
  defaultQuery: { 'api-version': '2023-07-01-preview' },
  defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_KEY },
});

// Chat Session Management
const systemPrompt = 'You are a cleaning expert and witty female robot assistant named Anna. Act as a friendly female bot. Follow the conversation context to provide detailed step-by-step cleaning instructions. Use bullet points, spacing, and relevant emojis (e.g., ✅, ✨, 🧹) in your responses. If the user greets you (e.g., "hi", "hello"), respond with a warm greeting. If the user asks personal questions like "Who are you?" or "What is your name?", reply "I am Anna, your AI cleaning assistant." Also, remember any cleaning-related details provided by the user for later reference. I want you to answer according to the temperature set like if it is low the answer should be in tact and brief but if it is high it should be more random and cover more content. If the question is not about cleaning, respond with "Out of my scope".'

let currentSession = {
  sessionId: Date.now().toString(),
  title: 'New Chat',
  conversation: [{
    role: 'system',
    content: systemPrompt
  }]
};

app.post('/api/chat/new', (req, res) => {
  currentSession = {
    sessionId: Date.now().toString(),
    title: 'New Chat',
    conversation: [{ role: 'system', content: systemPrompt }]
  };
  res.json({ message: 'New session', session: currentSession });
});

app.delete('/api/chat', (req, res) => {
  currentSession = {
    sessionId: Date.now().toString(),
    title: 'New Chat',
    conversation: [{ role: 'system', content: systemPrompt }]
  };
  res.json({ message: 'Session reset', session: currentSession });
});

app.put('/api/chat/rename', (req, res) => {
  const { newTitle } = req.body;
  if (!newTitle) return res.status(400).json({ error: 'Title required' });
  currentSession.title = newTitle;
  res.json({ message: 'Renamed', session: currentSession });
});


app.post('/api/chat', async (req, res) => {
  const { message, temperature } = req.body;
  currentSession.conversation.push({ role: 'user', content: message });
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: currentSession.conversation,
      temperature: temperature || 0.7,
      max_tokens: 800,
    });
    
    const reply = response.choices[0].message.content;
    currentSession.conversation.push({ role: 'assistant', content: reply });
    res.json({ reply, session: currentSession });
    
  } catch (error) {
    console.error('OpenAI error:', error);
    res.json({ reply: '🤖 Service unavailable', session: currentSession });
  }
});

app.get('/api/user', (req, res) => {
  req.isAuthenticated() ? res.json({ user: req.user }) : res.json({ user: null });
});

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));