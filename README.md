# iNotebook

iNotebook is a full-stack MERN (MongoDB, Express.js, React, Node.js) notes application that allows users to securely create, view, update, and delete personal notes. The application includes JWT-based authentication to ensure that each user can only access their own notes.

## Features

- User Signup & Login
- JWT Authentication
- Create, Read, Update & Delete Notes
- Protected API Routes
- MongoDB Database
- Responsive React Frontend

## Tech Stack

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bootstrap

## Project Structure

```
iNotebook/
├── backend/
├── public/
├── src/
├── package.json
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/inotebook.git
```

### Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Run the project

From the root directory:

```bash
npm run both
```
Demo Link: https://inotebook-mern-app.netlify.app/login
## Author

Ayesha Khalid
