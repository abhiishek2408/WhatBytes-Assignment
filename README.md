# 🏥 Healthcare Backend — Node.js + Express + PostgreSQL

A backend system for a healthcare application built with **Node.js**, **Express**, and **PostgreSQL**. It provides APIs for managing **patients, doctors, and mappings** with JWT authentication and secure data handling.

---

## 📂 Project Structure

```
backend-healthcare/
├── config/           # Configuration files (DB setup, JWT, etc.)
├── middleware/       # Custom middleware (e.g., authentication, error handling)
├── models/           # Database models (using Sequelize/pg queries)
├── node_modules/     # Installed dependencies
├── routes/           # API route definitions
├── TestApi/          # API testing files (Code REST / Postman collections)
├── utils/            # Utility functions (e.g., token helpers)
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency lock file
├── seed.js           # Script to seed initial data
└── server.js         # Entry point for the server
```

---

## 🚀 Features

* User authentication with JWT (`jsonwebtoken`)
* Patient Management (CRUD)
* Doctor Management (CRUD)
* Patient ↔ Doctor Mapping
* Error handling middleware
* Environment variable–based configuration
* PostgreSQL database (via Sequelize / pg)

---


## ⚙️ Installation

```bash
# install dependencies
npm install

# run database migrations / sync (depending on ORM)
node seed.js

# start server
npm run dev    # if using nodemon
npm start      # normal start
```

Server runs at `http://localhost:5000/` by default.

---

## 🗄️ Database Setup (PostgreSQL)

1. Install PostgreSQL and create a database and user:

```sql
CREATE DATABASE healthcare_db;
CREATE USER healthcare_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE healthcare_db TO healthcare_user;
```

2. Update `.env` with your DB credentials.

---

## 📡 API Endpoints

### 1. Authentication

* `POST https://whatbytes-assignment-ds1d.onrender.com/api/auth/register` → Register new user
* `POST https://whatbytes-assignment-ds1d.onrender.com/api/auth/login` → Login & receive JWT token

### 2. Patients

* `POST https://whatbytes-assignment-ds1d.onrender.com/api/patients/` → Add patient (Auth required)
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/patients/` → Get all patients (Auth required)
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/patients/:id` → Get single patient
* `PUT https://whatbytes-assignment-ds1d.onrender.com/api/patients/:id` → Update patient
* `DELETE https://whatbytes-assignment-ds1d.onrender.com/api/patients/:id` → Delete patient

### 3. Doctors

* `POST https://whatbytes-assignment-ds1d.onrender.com/api/doctors/` → Add doctor (Auth required)
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/doctors/` → Get all doctors
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/doctors/:id` → Get single doctor
* `PUT https://whatbytes-assignment-ds1d.onrender.com/api/doctors/:id` → Update doctor
* `DELETE https://whatbytes-assignment-ds1d.onrender.com/api/doctors/:id` → Delete doctor

### 4. Mappings

* `POST https://whatbytes-assignment-ds1d.onrender.com/api/mappings/` → Assign doctor to patient
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/mappings/` → Get all mappings
* `GET https://whatbytes-assignment-ds1d.onrender.com/api/mappings/:patientId` → Get doctors for patient
* `DELETE https://whatbytes-assignment-ds1d.onrender.com/api/mappings/:id` → Remove doctor from patient

---

## 🔐 Authentication & Middleware

* JWT tokens must be included in the header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNWNhOWU4LTI0NDQtNDY1ZC1iYjM5LWZjMDZmNTM1YTQ2NiIsImVtYWlsIjoidmlzaGVzaEBleGFtcGxlLmNvbSIsImlhdCI6MTc1NzA5NDE0OSwiZXhwIjoxNzU3NTI2MTQ5fQ.8gPhhnjcNQYbbz3X4Fr-_gmhWU2ZvVzZKtXmAZZoOf8
```

* Middleware ensures only authenticated users can access patient/doctor APIs.

---

## 🧪 Testing

* Use **TestApi/** folder with REST Client (VS Code extension) or Postman.
* Example flow:

  1. Register → Login → Get JWT token
  2. Create Patient
  3. Create Doctor
  4. Map Doctor ↔ Patient
  5. Retrieve data

---

## 📝 Scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed.js"
}
