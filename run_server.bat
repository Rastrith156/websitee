@echo off
echo Stopping any running node processes...
taskkill /F /IM node.exe >nul 2>&1
echo Starting University Server...
echo MongoDB URI: mongodb://localhost:27017/university_db
echo API Endpoint: http://localhost:3000/api/chat
npm start
pause
