# Personal Expense Tracker

## Overview
This is a Personal Expense Tracker API built with Express.js and SQLite, allowing users to manage their transactions efficiently.

---

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Postman Screenshots](#postman-screenshots)

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- SQLite (for the database)

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd personal-expense-tracker
    ```
   
2. Install dependencies:
    ```bash
    npm install
    ```

3. Create the SQLite database:
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
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
        "username": "user123",
        "password": "securePassword"
    }
    ```
- **Response:**
    - **Status Code:** 201 Created
    - **Body:**
        ```json
        {
            "id": 1,
            "username": "user123"
        }
        ```

#### User Login
- **Endpoint:** `/api/users/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
    ```json
    {
        "username": "user123",
        "password": "user@123"
    }
    ```
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "auth": true,
            "token": "your_jwt_token_here"
        }
        ```

---

### Transactions

#### Create Transaction
- **Endpoint:** `/api/transactions`
- **Method:** `POST`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer your_jwt_token_here`
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
            "id": 1,
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
- **Headers:** `Authorization: Bearer your_jwt_token_here`
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
- **Endpoint:** `/api/transactions/:id`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer your_jwt_token_here`
- **Response (Success):**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "id": 1,
            "type": "expense",
            "category": "Food",
            "amount": 50,
            "date": "2024-10-23",
            "description": "Dinner"
        }
        ```

#### Update Transaction by ID
- **Endpoint:** `/api/transactions/:id`
- **Method:** `PUT`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer your_jwt_token_here`
- **Request Body:**
    ```json
    {
        "type": "expense",
        "category": "Food",
        "amount": 60,
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
- **Endpoint:** `/api/transactions/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer your_jwt_token_here`
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
- **Headers:** `Authorization: Bearer your_jwt_token_here`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "totalIncome": 0,
            "totalExpense": 50,
            "balance": -50
        }
        ```

---

## Postman Screenshots
![User Registration](path/to/user_registration_screenshot.png)
![User Login](path/to/user_login_screenshot.png)
![Create Transaction](path/to/create_transaction_screenshot.png)
![Get All Transactions](path/to/get_all_transactions_screenshot.png)
![Get Transaction by ID](path/to/get_transaction_by_id_screenshot.png)
![Update Transaction](path/to/update_transaction_screenshot.png)
![Delete Transaction](path/to/delete_transaction_screenshot.png)
![Get Summary](path/to/get_summary_screenshot.png)

---

## License
This project is licensed under the MIT License.

