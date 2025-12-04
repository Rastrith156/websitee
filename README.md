# University Website Project

## MongoDB Connection Details

### Connection URI
```
mongodb://localhost:27017/university_db
```

### Database Structure
- **Database Name:** `university_db`
- **Collections:**
  - `registrations` - Stores student registration data
  - `chatmessages` - Stores chatbot conversation history

## API Endpoints

### Registration Endpoints
- **Submit Registration:** `POST http://localhost:3000/api/register`
  - Body: `{ fullName, email, phone, course, dob }`
  
- **Get All Registrations:** `GET http://localhost:3000/api/registrations`
  - Returns: Array of all registered students

### Chatbot Endpoints
- **Save Chat Message:** `POST http://localhost:3000/api/chat`
  - Body: `{ message, sender }`
  
- **Get All Chats:** `GET http://localhost:3000/api/chats`
  - Returns: Array of all chat messages

## How to Run

### Option 1: Using Batch File
Double-click `run_server.bat` in the project folder

### Option 2: Using Command Line
```bash
npm start
```

## Features

### Registration Form
1. Fill in student details (Name, Email, Phone, Course, DOB)
2. Click "Register Now"
3. **Preview modal appears** showing all entered details
4. Review the information
5. Click "Confirm & Submit" to save to MongoDB
6. Or click "Edit Details" to go back and modify

### Chatbot
- All chat conversations are automatically saved to MongoDB
- Each message includes:
  - Message content
  - Sender (user/bot)
  - Timestamp

## Viewing Data in MongoDB

### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `university_db`
4. View collections:
   - Click `registrations` to see all registered students
   - Click `chatmessages` to see all chat history

### Using MongoDB Shell
```bash
mongosh
use university_db
db.registrations.find()
db.chatmessages.find()
```

## Project Structure
```
├── index.html              # Main landing page
├── registration.html       # Registration form with preview
├── registration.css        # Registration form styles
├── style.css              # Main website styles
├── script.js              # Main website JavaScript
├── server.js              # Backend server (Express + MongoDB)
├── package.json           # Node.js dependencies
├── run_server.bat         # Quick start script
└── README.md              # This file
```

## Notes
- Make sure MongoDB is running on your system before starting the server
- Default port: 3000
- All data is stored locally in MongoDB
