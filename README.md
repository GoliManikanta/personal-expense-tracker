# Personal Expense Tracker

## Objective

Develop a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Tools and Technologies

- **Backend Framework**: Node.js with Express.js
- **Database**: SQLite


### Database Setup

- **SQLite**: Create a database with tables:
  - `transactions`: id, type (income or expense), category, amount, date, description
  - `categories`: id, name, type (income or expense)

### API Endpoints

- `POST /api/transactions`: Adds a new transaction (income or expense).
- `GET /api/transactions`: Retrieves all transactions.
- `GET /api/transactions/:id`: Retrieves a transaction by ID.
- `PUT /api/transactions/:id`: Updates a transaction by ID.
- `DELETE /api/transactions/:id`: Deletes a transaction by ID.
- `GET /api/summary`: Retrieves a summary of transactions, such as total income, total expenses, and balance. Optionally, this can be filtered by date range or category.


## API Documentation

### User Registration

- **URL**: `http://localhost:3000/api/users/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "username",
    "password": "password"
  }
