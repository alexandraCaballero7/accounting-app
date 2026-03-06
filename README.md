# Accounting Voucher Frontend

Frontend application built to consume the **Accounting Voucher API**.
The application allows users to manage **Employees** and **Accounting Vouchers** with their corresponding items.

---

# 📦 Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-repository/accounting-voucher-frontend.git
cd accounting-voucher-frontend
```

### 2. Install dependencies

Make sure you have **Node.js (v18 or higher)** installed.

```bash
npm install
```

---

# ▶️ How to Run the Application

Start the development server:

```bash
npm start
```

or

```bash
ng serve
```

The application will be available at:

```
http://localhost:4200
```

---

# 🧰 Frameworks and Libraries Used

Main technologies used in this project:

* **Angular** – Frontend framework v21.1.4
* **TypeScript** – Typed JavaScript
* **Bootstrap 5** – UI styling and responsive layout
* **RxJS** – Reactive programming for handling asynchronous data
* **Angular Reactive Forms** – Form management and validation

Custom components were created to improve reusability, including:

* Generic Table Component
* Confirmation Dialog Component
* Toast Notification Service
* Reusable Forms for Employees and Vouchers

---

# ⚙️ API Base URL Configuration

The API base URL is configured in the environment files.

Location:

```
src/environments/environment.ts
```

Example configuration:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url/api'
};
```

In production:

```
src/environments/environment.prod.ts
```

Example:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://production-api-url/api'
};
```

Services consume the API using this base URL:

```ts
this.http.get(`${environment.apiUrl}/employees`)
```

This allows easy switching between **development and production environments**.

---

# 📋 Features

### Employees

* List employees
* Create employee
* View employee details
* Edit employee
* Delete employee

### Vouchers

* List vouchers
* Create accounting voucher
* Add debit and credit items
* Calculate totals (Debits, Credits, Total Amount)
* View voucher details
* Edit voucher
* Delete voucher

---

# 🧩 Architecture

The project follows a **feature-based structure**:

```
# 🧩 Architecture

The project follows a **feature-based architecture** to improve scalability and maintainability.

```
src/app
 ├── core
 │    ├── interceptors
 │    ├── services
 │    └── models
 │
 ├── features
 │    ├── employees
 │    │    ├── pages
 │    │    ├── components
 │    │    ├── DTOs
 │    │    └── services
 │    │
 │    └── vouchers
 │         ├── pages
 │         ├── components
 │         ├── DTOs
 │         └── services
 │
 ├── shared
 │    ├── components
 │    │    ├── generic-table
 │    │    ├── confirm-dialog
 │    │    └── loading-spinner
 │    │
 │    ├── services
 │    │    └── toast.service
 │    │
 │    └── utils
 │         └── date-utils
 │
 └── app.config.ts
```

### Folder Responsibilities

core

* Global services
* HTTP interceptors
* Application-wide logic

features

* Feature modules organized by business domain (Employees, Vouchers)

shared

* Reusable components, utilities, and services used across multiple features

---

# 👩‍💻 Author

Frontend Developer Technical Assessment
Developed by Alexandra Caballero
