# 🚀 NestJS Blog API

A simple and secure backend API built with **NestJS**, featuring **JWT authentication** and modular architecture.

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YatamCharishma/Blog-Posts-Backend-NestJS
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a file named `.env` in the root of the project and add:

```env
PORT=3000
JWT_SECRET=super-secret-jwt
JWT_EXPIRES_IN=1d
```

> ⚠️ Never commit `.env` to version control.

---

## 🚀 Run the App

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Regular start
npm run start
```

App runs on: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication (JWT)

This API uses **JWT** for securing protected routes.

1. Login via `POST /auth/login` to get a token.
2. Use the token in the `Authorization` header for protected endpoints:

```
Authorization: Bearer <your_token>
```

---

## ✅ Test Commands

```bash

# Test coverage
npm run test:cov
```

---

## 📁 Folder Structure (Example)

```
src/
├── auth/           # Auth logic (JWT, guards)
├── users/          # User module
├── posts/          # Blog post module
├── utils/          # Shared File fetching func
├── main.ts         # App entry point
└── app.module.ts   # Root module
```

---

## 🔗 Postman Collection Link

[Postman Collection](https://web.postman.co/workspace/My-Workspace~4e193b59-6cf1-49d7-828f-a044e0b21906/collection/38364520-d9da7648-20df-4ae4-afcb-fb3b6d98e652?action=share&source=copy-link&creator=38364520)

---

## 📝 License

License © [Charishma Yatam]
