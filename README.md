# Node Backend User Management API

This project is a **User Management CRUD API** built with Node.js, Express, and MongoDB. It is designed to efficiently handle user data, providing robust functionalities to create, read, update, and delete user information, as well as search, filter, and paginate user records.

## Features

- **Create User**: Add new users with details such as Name, Age, Message, Gender, Email, Contact, and Status.
- **Read User(s)**: Fetch individual user details or list all users.
- **Update User**: Modify existing user information.
- **Delete User**: Remove users from the database.
- **Search & Filter**: Search users by Name, Age, or Email. Filter users by Gender and Status.
- **Pagination**: Support for paginated user lists to enhance performance and usability.
- **Frontend Integration**: EJS-based views for user forms and details.
- **RESTful API**: Structured endpoints for integration with other services.
- **MongoDB Atlas Integration**: Connects to a remote MongoDB database.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **View Engine**: EJS

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account and connection URI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sakshi-chakre-04/node-backend.git
   cd node-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:10000` by default.

## API Endpoints

| Method | Endpoint                                   | Description                  |
|--------|--------------------------------------------|------------------------------|
| POST   | `/api/user/saveUserDetails`                | Create a new user            |
| GET    | `/api/user/getUserDetails`                 | Get users (with pagination)  |
| GET    | `/api/user/getUserDetails/:id`             | Get user by ID               |
| PUT    | `/api/user/updateUserDetails/:id`          | Update user by ID            |
| DELETE | `/api/user/deleteUserDetails/:id`          | Delete user by ID            |
| GET    | `/api/user/userForm`                       | Render user creation form    |
| GET    | `/api/user/about`                          | About the project            |

### Query Parameters for `/getUserDetails`
- `page`: (optional) Page number, default `1`
- `limit`: (optional) Users per page, default `10`
- `search`: (optional) Search by Name, Age, or Email
- `gender`: (optional) Filter by gender
- `Status`: (optional) Filter by status

## Example User Object

```json
{
  "Name": "Alice",
  "Age": "28",
  "Message": "Hello!",
  "gender": "female",
  "email": "alice@example.com",
  "contact": "1234567890",
  "Status": "active"
}
```

## Project Structure

```
node-backend/
├── app/
│   ├── controllers/        # Route handler logic
│   ├── models/             # Mongoose schemas/models
│   ├── routes/             # Express route definitions
│   └── services/           # Business logic/services
├── views/                  # EJS templates for frontend
├── public/                 # Static files
├── server.js               # Entry point
└── package.json
```

## About

This project is a User Management CRUD API designed to handle user data efficiently. It provides functionalities to create, read, update, and delete user information, with additional features like search, filtering, and pagination.

---

## Project Link

[Live User Form](https://node-backend-3-f264.onrender.com/api/user/userForm)

---

**Author:** [sakshi-chakre-04](https://github.com/sakshi-chakre-04)

Feel free to contribute or raise issues!

