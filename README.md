# TaskTrackerDashboard
Task Tracker Dashboard is a modern, responsive web application designed to help users efficiently manage their daily tasks. It provides a visually appealing, easy-to-use dashboard interface where users can add, edit, delete, filter, and download their tasks in CSV format. The app focuses on simplicity, functionality, and a smooth user experience.
<img width="1908" height="945" alt="image" src="https://github.com/user-attachments/assets/42dfaa2d-b978-4247-828f-64e57c36fcc7" />
1️⃣Clone the Repository
Run the following commands in your terminal:
git clone https://github.com/saeel03/TaskTrackerDashboard.git
cd TaskTrackerDashboard
2️⃣ Setup the Backend
Navigate to the backend folder and install dependencies:
cd backend
npm install
Create a MySQL database and table using the following commands:
CREATE DATABASE task_tracker;
USE task_tracker;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50),
  priority VARCHAR(50),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Create a file named `.env` inside the backend folder and add:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_tracker
PORT=5000
Run the backend server:
npm start

Server will run at: http://localhost:5000
3️⃣ Setup the Frontend
Open a new terminal and run:
cd frontend
npm install
npm run dev
Frontend will run at: http://localhost:5173
4️⃣ Running the App
1. Start the backend server (port 5000)
2. Start the frontend (port 5173)
3. Open http://localhost:5173 in your browser
4. Add, edit, delete, and export tasks 🎯
5️⃣ Folder Structure
TaskTrackerDashboard/
│
├── backend/
│   ├── routes/
│   │   └── tasks.js
│   ├── server.js
│   ├── package.json
│   └── db.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

Developed by: Saeel Sakhalkar 
