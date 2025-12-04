const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/university_db';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const registrationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    course: String,
    dob: Date,
    registrationDate: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!', id: newRegistration._id });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
});

// Get all registrations
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ registrationDate: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations', error: error.message });
    }
});

// Chat Schema
const chatSchema = new mongoose.Schema({
    message: String,
    sender: String, // 'user' or 'bot'
    timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', chatSchema);

// Chat API
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sender } = req.body;
        const newChat = new ChatMessage({ message, sender });
        await newChat.save();
        res.status(201).json({ message: 'Chat saved' });
    } catch (error) {
        console.error('Error saving chat:', error);
        res.status(500).json({ message: 'Error saving chat', error: error.message });
    }
});

// Get all chat messages
app.get('/api/chats', async (req, res) => {
    try {
        const chats = await ChatMessage.find().sort({ timestamp: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chats', error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
