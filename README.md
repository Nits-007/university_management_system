# 🎓 University Management System 

A modern and scalable University Management System built using  **Django Rest Framework** and **React.js**. This system allows university admins to efficiently manage operations like student/staff records, department data, and more — all with role-based access control.

---

## 📌 Project Description

This is designed to work as part of a larger University Management System. It focuses on the user interface and client-side functionalities, enabling smooth interaction with the backend APIs. The system supports multiple user roles and enables CRUD operations on various entities like students, staff, departments, courses, hostels, libraries, and more.

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

# Step 2: Navigate into the root directory and open terminal
Install pip and npm

# Step 3: Install dependencies
pip install -r requirements.txt

# Step 4: Create the tables
python manage.py makemigrations
python manage.py migrate

# Step 5: Create the DB Admin
python manage.py createsuperuser (username : dbadmin , password : admin123)

# Step 6: Run the backend 
python manage.py runserver

# Step 7: Navigate into the frontend directory
cd university-frontend

# Step 8: Install dependencies
npm install

# Step 9: Run the application
npm run start
