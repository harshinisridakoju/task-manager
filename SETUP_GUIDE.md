# Task Management App - Setup & Usage Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

---

## 📦 Backend Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` folder with:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

**For MongoDB Atlas (Cloud):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Start Backend Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies
```bash
cd frontend/frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend will typically run on `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

---

## ✅ Task Types Currently Available

1. **Work** 💼 - Work-related tasks
2. **Personal** 👤 - Personal tasks
3. **Shopping** 🛒 - Shopping lists
4. **Health** ❤️ - Health & fitness
5. **Education** 📚 - Learning & study
6. **Other** 📌 - Miscellaneous

---

## 📋 How to Add New Task Types

### Step 1: Update Backend Model
Edit `backend/models/task.js`:

```javascript
type: {
  type: String,
  enum: [
    "Work", 
    "Personal", 
    "Shopping", 
    "Health", 
    "Education",
    "New Type Here",  // ← Add your new type
    "Other"
  ],
  default: "Other",
},
```

### Step 2: Update Frontend Form
Edit `frontend/frontend/src/components/taskform.jsx`:

Find the type select dropdown and add your new option:

```jsx
<motion.select
  id="type"
  name="type"
  value={formData.type}
  onChange={handleChange}
  whileFocus={{ scale: 1.02 }}
>
  <option value="Work">💼 Work</option>
  <option value="Personal">👤 Personal</option>
  <option value="Shopping">🛒 Shopping</option>
  <option value="Health">❤️ Health</option>
  <option value="Education">📚 Education</option>
  <option value="Your New Type">🎯 Your New Type</option>  {/* ← Add here */}
  <option value="Other">📌 Other</option>
</motion.select>
```

### Step 3: Add Icon in TaskCard (Optional)
Edit `frontend/frontend/src/components/taskcard.jsx`:

```javascript
const getTypeIcon = (type) => {
  const icons = {
    Work: "💼",
    Personal: "👤",
    Shopping: "🛒",
    Health: "❤️",
    Education: "📚",
    "Your New Type": "🎯",  // ← Add here with emoji
    Other: "📌",
  };
  return icons[type] || "📌";
};
```

### Step 4: Restart Backend
```bash
npm run dev  # in backend folder
```

---

## 🔧 API Endpoints

### Get All Tasks
```
GET /api/tasks
```

### Create Task
```
POST /api/tasks
Body: {
  "title": "Task title",
  "description": "Task description",
  "type": "Work",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-06-20"
}
```

### Update Task
```
PUT /api/tasks/:id
Body: { ...updated fields }
```

### Delete Task
```
DELETE /api/tasks/:id
```

---

## 📊 Task Properties

| Property | Type | Values | Default |
|----------|------|--------|---------|
| title | String | Any | Required |
| description | String | Any | - |
| type | String | Work, Personal, Shopping, Health, Education, Other | Other |
| priority | String | Low, Medium, High | Medium |
| status | String | Pending, In Progress, Completed | Pending |
| dueDate | Date | Any valid date | - |

---

## 🎨 Features

✅ **Centered, Animated UI** - Beautiful gradients and smooth animations
✅ **Full CRUD Operations** - Create, read, update, delete tasks
✅ **Task Filtering** - Filter by status
✅ **Task Types** - Organize by category
✅ **Priority Levels** - Set task importance
✅ **Status Tracking** - Track progress
✅ **Statistics Dashboard** - See task overview
✅ **Responsive Design** - Works on all devices

---

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify MONGO_URI in .env file

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in `taskService.js`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

## 📁 Project Structure

```
TaskManagementapp/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskcontroller.js
│   ├── models/
│   │   └── task.js
│   ├── routes/
│   │   └── taskroutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── taskcard.jsx
        │   │   ├── taskcard.css
        │   │   ├── taskform.jsx
        │   │   └── taskform.css
        │   ├── services/
        │   │   └── taskService.js
        │   ├── pages/
        │   │   ├── Dashboard.jsx
        │   │   ├── Login.jsx
        │   │   └── Register.jsx
        │   ├── App.jsx
        │   ├── App.css
        │   ├── index.css
        │   └── main.jsx
        └── package.json
```

---

## 🎯 Next Steps

1. ✅ Start backend: `npm run dev` (in backend folder)
2. ✅ Start frontend: `npm run dev` (in frontend folder)
3. ✅ Open `http://localhost:5173`
4. ✅ Create your first task!

Enjoy managing your tasks! 🚀
