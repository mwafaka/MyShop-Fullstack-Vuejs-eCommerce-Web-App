# 🛍️ MyShop — Fullstack Vuejs eCommerce Web App

A sleek and modern fullstack eCommerce application built with **Vue.js (frontend)** and **Node.js + Express (backend)**, featuring user authentication, admin dashboard, image upload, shopping cart functionality, and a responsive iPhone-style design using Tailwind CSS.

---

## 🚀 Features

- 🧑 User registration and login
- 🛠 Admin dashboard to manage products
- 🖼️ Product image upload with `multer`
- 🛒 User-specific cart with quantity and remove options
- 🔐 Role-based access (Admin vs. User)
- 🎨 Elegant mobile-first UI with Tailwind CSS
- 🌐 REST API built with Express and MongoDB

---

## 📦 Technologies Used

### Frontend
- [Vue 3](https://vuejs.org/) + [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/) for HTTP requests
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Multer](https://github.com/expressjs/multer) for file uploads
- [JWT](https://jwt.io/) for authentication

---

## 📂 Project Structure

myshop/
├── client/             # Vue.js frontend
│   ├── views/          # Pages (Home, Admin, Login, Cart)
│   └── components/     # Reusable components
│
├── server/             # Express backend
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth, Multer, etc.
│   └── uploads/        # Uploaded product images
│
└── README.md           # Project documentation



## 🔌 Backend Setup

cd server
npm install
touch .env


Create a .env file and add:

```ìni
PORT=5000
MONGO_URI=mongodb://localhost:27017/myshop
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
npm run dev
```

## 🎨 Frontend Setup    

```bash
  cd client
npm install
npm run dev
```

## 🖼️ Image Upload Tips
- Product images are stored in /server/uploads
- Ensure the folder exists:

```bash
mkdir -p server/uploads
```

- enctype="multipart/form-data" is required in the form.

  
## 🛡️ Admin Access
To create an admin:

1. Register a user

2. Manually update their role in MongoDB:
```json
{ "role": "admin" }

```


## ✨ Screenshots

![Alt Text](/screenshots/Screenshot%20from%202025-05-07%2006-52-45.png)
![Alt Text](/screenshots/Screenshot%20from%202025-05-07%2006-53-02.png)
