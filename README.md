# Personal Expense Tracker API Documentation

## Base URL
`http://localhost:3000`

---

## Authentication

### User Registration
- **Endpoint:** `/api/users/register`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
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

### User Login
- **Endpoint:** `/api/users/login`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body:**
    ```json
    {
        "username": "user123",
        "password": "securePassword"
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

## Categories

### Add Category
- **Endpoint:** `/api/categories`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Request Body:**
    ```json
    {
        "name": "Food",
        "type": "expense"
    }
    ```
- **Response:**
    - **Status Code:** 201 Created
    - **Body:**
        ```json
        {
            "id": 1,
            "name": "Food",
            "type": "expense"
        }
        ```

### Get All Categories
- **Endpoint:** `/api/categories`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        [
            {
                "id": 1,
                "name": "Food",
                "type": "expense"
            }
        ]
        ```

---

## Transactions

### Create Transaction
- **Endpoint:** `/api/transactions`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
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

### Get All Transactions
- **Endpoint:** `/api/transactions`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
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

### Get Transaction by ID
- **Endpoint:** `/api/transactions/:id`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
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
- **Response (Not Found):**
    - **Status Code:** 404 Not Found
    - **Body:**
        ```json
        {
            "error": "Transaction not found"
        }
        ```

### Update Transaction by ID
- **Endpoint:** `/api/transactions/:id`
- **Method:** `PUT`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
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

### Delete Transaction by ID
- **Endpoint:** `/api/transactions/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "message": "Transaction deleted successfully"
        }
        ```
- **Response (Not Found):**
    - **Status Code:** 404 Not Found
    - **Body:**
        ```json
        {
            "error": "Transaction not found"
        }
        ```

---

## Summary

### Get Summary of Transactions
- **Endpoint:** `/api/summary`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI5NjYyMjQzLCJleHAiOjE3Mjk2NjU4NDN9.wHv9MCR1C-EALU42GQE6Tacj9rtZWxTldeFu4HPXr8M`
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

## Error Responses
- **Status Code:** 401 Unauthorized
- **Body:**
    ```json
    {
        "error": "Unauthorized access"
    }
    ```

- **Status Code:** 500 Internal Server Error
- **Body:**
    ```json
    {
        "error": "Something went wrong"
    }
    ```

