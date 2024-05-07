# Project README

This README provides instructions for setting up and running the QuadB-Tech project, which consists of a server-side and a client-side application. Follow the steps below to get started.

## Server Setup

1. Navigate to the server directory:cd QuadB-Tech/Server

2. Install dependencies:npm install

3. Start the server:npm run start

## Client Setup

1. Navigate to the client directory:cd QuadB-Tech/Client

2. Install dependencies:npm install

3. Run the client application in development mode:npm run dev

## Usage

- **Signup**: Use the following URL for signup:http://localhost:5173/signup

- **Login**: Use the following credentials for login:
- Username: tannu
- Password: 123456

## Environment Variables

### Server (.env)

Ensure you have a `.env` file in the server root directory with the following variables:

PORT=
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=YOUR_MONGODB_URI
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY=YOUR_ACCESS_TOKEN_EXPIRY
REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRY=YOUR_REFRESH_TOKEN_EXPIRY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET


Replace `YOUR_MONGODB_URI`, `YOUR_ACCESS_TOKEN_SECRET`, `YOUR_ACCESS_TOKEN_EXPIRY`, `YOUR_REFRESH_TOKEN_SECRET`, `YOUR_REFRESH_TOKEN_EXPIRY`, `YOUR_CLOUDINARY_CLOUD_NAME`, `YOUR_CLOUDINARY_API_KEY`, and `YOUR_CLOUDINARY_API_SECRET` with your respective values.

### Client (.env)

Ensure you have a `.env` file in the client root directory with the following variables:

VITE_REGISTER_API=/api/v1/users/register
VITE_LOGIN_API=/api/v1/users/login
VITE_GETUSERTASK_API=/api/v1/users/getUserTodo
VITE_GETCURRENTUSER_API=/api/v1/users/getCurrentUser
VITE_ADDTODO_API=/api/v1/todos/add-task
VITE_DELETETODO_API=/api/v1/todos/deleteTask
VITE_UPDATETODO_API=/api/v1/todos/updateTask

## Notes

- Replace placeholders like `YOUR_MONGODB_URI`, `YOUR_ACCESS_TOKEN_SECRET`, etc., with your actual values.
- Ensure MongoDB is running and accessible with the provided URI.
- Modify `CORS_ORIGIN` if your client application runs on a different port.

By following these steps and configurations, you should be able to set up and run the QuadB-Tech project successfully.




