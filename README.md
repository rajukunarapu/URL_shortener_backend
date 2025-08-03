## 📄 **Backend README (README.md)**

```markdown
# 🔗 URL Shortener Backend

This is the **Node.js + Express backend** for the URL Shortener project.  
It provides REST APIs for:
- 🔐 **User authentication** (Signup/Login/Logout)
- ✂ **URL shortening**
- 📊 **URL stats (click counts, creator info, etc.)**

---

## 🚀 Features
- ⚡ **Express.js** for backend APIs
- 🗄️ **MongoDB + Mongoose** for database
- 🔐 **JWT authentication** stored in cookies
- 🌍 **CORS setup** for frontend-backend connection
- 📝 **Click tracking** for each short URL

---

## 🏗️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT**
- **bcrypt** for password hashing

---

## ⚙️ Installation & Setup
```bash
# Clone repo
git clone <backend-repo-url>

# Go into project folder
cd url-shortener-backend

# Install dependencies
npm install

# Run server
npm run dev
👉 The backend will run on http://localhost:5000 by default.

🔗 Environment Variables
Create a .env file in the root and add:

env
Copy
Edit
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
FRONTEND_URL=http://localhost:5173
📂 Folder Structure
pgsql
Copy
Edit
server/
 ├── Config/         # Database connection
 ├── Controllers/    # Auth & URL controllers
 ├── Models/         # User & URL schemas
 ├── Routes/         # API routes
 ├── Middlewares/    # Auth middleware
 ├── app.js          # App setup (middlewares, routes)
 └── server.js       # Server start
📡 API Endpoints
🔐 Auth
POST /auth/signup → Register user

POST /auth/login → Login user

POST /auth/logout → Logout user

✂ URL Shortener
POST /url/shorten → Shorten a URL (auth required)

GET /url/:code → Redirect to original URL OR return JSON (if API call)

GET /url/stats/:code → Get stats for a URL

GET /url/all → Get all URLs created by logged-in user

🤝 AI Acknowledgment
This backend was built with AI assistance (ChatGPT).
AI was used for:

📘 Learning how to structure a modular backend

🛠 Planning routes, controllers, and models

✍️ Writing boilerplate code (later reviewed, tested, and customized)
