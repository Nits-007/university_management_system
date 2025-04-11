# 🎓 University Management System Frontend

A modern and scalable University Management System built using **React.js**. This system allows university admins to efficiently manage operations like student/staff records, department data, and more — all with role-based access control.

---

## 📌 Project Description

This frontend project is designed to work as part of a larger University Management System. It focuses on the user interface and client-side functionalities, enabling smooth interaction with the backend APIs. The system supports multiple user roles and enables CRUD operations on various entities like students, staff, departments, courses, hostels, libraries, and more.

---

## 🚀 Technologies Used

- **React.js**
- **Redux Toolkit (RTK Query)** – For API data fetching and state management
- **React Router** – For dynamic routing
- **JWT (JSON Web Tokens)** – For authentication
- **Tailwind CSS / CSS Modules** – For responsive and modern UI
  
---

## ✨ Key Features

- 🔐 **Authentication System**
  - Login and Signup functionality
  - JWT-based secure login
  - Persistent user session

- 🧑‍💼 **Dual Power Users**
  - **DBA (Database Admin)**: Has full access to all data, including user permission management
  - **Staff User**: Can only access granted modules or functionalities

- ⚙️ **Role-Based Access Control**
  - Dynamic permission management per user
  - Admin can grant/restrict access to any CRUD operation on any entity
  - Access toggles for `can_view`, `can_create`, `can_edit`, and `can_delete`

- 📊 **Data Management**
  - Dynamic forms and tables based on schema
  - Inter-table relationships supported (e.g., Student belongs to Department)
  - Smart dropdowns for foreign key references
  - CRUD operations: Create, Read, Update, Delete

- 🧩 **Modular Architecture**
  - Component-based structure
  - Schema-driven table and form rendering
  - Easily extendable for new entities

- 🔄 **Auto Fetch & Update**
  - Tables auto-refresh after data operations
  - Inline error handling and alerts

---

## 🛠️ How to Install and Run the Project

```bash
# Step 1: Clone the repository
git clone https://github.com/kumar09sahil/university-frontend.git

# Step 2: Navigate into the project directory
cd university-frontend

# Step 3: Install dependencies
npm install

# Step 4: Run the application
npm run start
