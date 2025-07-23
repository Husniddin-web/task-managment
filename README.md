# 🧪 NestJS Student Course Management API

A test-friendly backend API built with **NestJS**, **MongoDB**, and **JWT Authentication**, featuring:

- ✅ Role-based access (`Admin`, `Student`, `User`)
- 📚 Course creation and enrollment
- 👨‍🎓 Admin-managed student registration
- 🔐 Secure login with access & refresh tokens
- 📖 Swagger UI for interactive API documentation
- 🚀 Auto-seeding of default users on app start

---

## ⚙️ How to Run Locally

### 1. Clone the Project

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

 npm install

Create .env File
You can use the following as your .env:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/nest-student
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d


npm run start:dev

. API Documentation (Swagger)


http://localhost:PORT/api/docs

// login info for users

// admin : admin@gmail.com   password: admin_mock

// simple user : user@gmail.com  password : user123

// simple user : student@gmail.com  password : student123

```
