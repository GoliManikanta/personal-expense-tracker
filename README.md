# Personal Expense Tracker

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Postman Screenshots](#postman-screenshots)

---

## Setup Instructions

### Prerequisites
- Node.js
- SQLite 
- Express.js

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd personal-expense-tracker
    ```
   
2. Install dependencies:
    ```bash
    npm install express sqlite3 sequelize body-parser cors jsonwebtoken bcryptjs
    ```

3. Optional: Install development tools like Nodemon:
    ```bash
    npm install --save-dev nodemon
    ```

### Running the Application
1. Start the server:
    ```bash
    npm start
    ```

2. The API will be available at `http://localhost:3000`.

---

## API Documentation

### Base URL
`http://localhost:3000`

### Authentication

#### User Registration
- **Endpoint:** `/api/users/register`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
    ```json
    {
      "username": "Manikanta",
      "password": "Manikanta@123"
    }
    ```
- **Response:**
    - **Status Code:** 201 Created
    - **Body:**
        ```json
        {
            "id": 1,
            "username": "Manikanta"
        }
        ```

#### User Login
- **Endpoint:** `/api/users/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
    ```json
    {
      "username": "Manikanta",
      "password": "Manikanta@123"
    }
    ```
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "auth": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M"
        }
        ```

---

### Transactions

#### Create Transaction
- **Endpoint:** `/api/transactions`
- **Method:** `POST`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Request Body:**
    ```json
    {
      "type": "income",
      "category": "salary",
      "amount": 25000,
      "date": "2024-10-10",
      "description": "month salary"
    }
    ```
- **Response:**
    - **Status Code:** 201 Created
    - **Body:**
        ```json
        {
        "id": 2,
        "type": "income",
        "category": "salary",
        "amount": 25000,
        "date": "2024-10-10",
        "description": "month salary"
        }
        ```
- **Request Body:**
    ```json
    {
        "type": "expense",
        "category": "Food",
        "amount": 50,
        "date": "2024-10-23",
        "description": "Dinner"
    }
    ```
- **Response:**
    - **Status Code:** 201 Created
    - **Body:**
        ```json
        {
            "id": 3,
            "type": "expense",
            "category": "Food",
            "amount": 50,
            "date": "2024-10-23",
            "description": "Dinner"
        }
        ```

#### Get All Transactions
- **Endpoint:** `/api/transactions`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        [
            {
                "id": 1,
                "type": "expense",
                "category": "Food",
                "amount": 50,
                "date": "2024-10-23",
                "description": "Dinner"
            }
        ]
        ```

#### Get Transaction by ID
- **Endpoint:** `/api/transactions/3`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response (Success):**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "id": 3,
            "type": "expense",
            "category": "Food",
            "amount": 50,
            "date": "2024-10-23",
            "description": "Dinner",
            "user_id": 1
          }
        ```

#### Update Transaction by ID
- **Endpoint:** `/api/transactions/2`
- **Method:** `PUT`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Request Body:**
    ```json
    {
        "type": "expense",
        "category": "Food",
        "amount": 600,
        "date": "2024-10-23",
        "description": "Dinner updated"
    }
    ```
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "message": "Transaction updated successfully"
        }
        ```

#### Delete Transaction by ID
- **Endpoint:** `/api/transactions/3`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "message": "Transaction deleted successfully"
        }
        ```

---

### Summary

#### Get Summary of Transactions
- **Endpoint:** `/api/summary`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "total_income": 25000,
            "total_expense": 600,
            "balance": 24400
        }
        ```

---

## Postman Screenshots
![User Registration](User_registration.png)
![User Login](user_login.png)
![Create Transaction](post_transaction.png)
![Get All Transactions](get_all_transactions.png)
![Get Transaction by ID](get_by_id.png)
![Update Transaction](update_by_id.png)
![Delete Transaction](delete_by_id.png)
![Get Summary](summary.png)

