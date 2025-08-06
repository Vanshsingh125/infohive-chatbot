# Authentication System Setup Guide

This guide will help you set up the authentication system for the GNDEC InfoHive chatbot.

## Prerequisites

1. **MongoDB**: You need MongoDB installed and running locally, or use MongoDB Atlas (cloud service)
2. **Node.js**: Version 18 or higher
3. **npm**: For package management

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service
3. The application will automatically create the database `chatbot_db`

### Option 2: MongoDB Atlas (Recommended for production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in the `.env` file

## Environment Variables

### Server (.env file in server directory)

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/chatbot_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Important**:

- Replace `your_jwt_secret_key_here` with a strong, random string
- For production, use a MongoDB Atlas connection string
- Keep your JWT_SECRET secure and never commit it to version control

### Client (.env file in client directory)

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:3001
```

## Installation and Setup

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Start the Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

### 4. Start the Client

```bash
cd client
npm start
```

The client will run on `http://localhost:3000`

## Features

### Authentication Flow

1. **Sign Up**: Users can create new accounts with username, email, and password
2. **Login**: Users can sign in with email and password
3. **Protected Routes**: Only authenticated users can access the chatbot
4. **JWT Tokens**: Secure authentication using JSON Web Tokens
5. **Password Hashing**: Passwords are securely hashed using bcrypt

### User Management

- User data is stored in MongoDB
- Passwords are hashed before storage
- JWT tokens provide secure session management
- Automatic logout functionality

### Security Features

- Password validation (minimum 6 characters)
- Email format validation
- Username uniqueness check
- Secure password hashing
- JWT token expiration (7 days)

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Chat Endpoint

- `POST /api/chat` - Send message to chatbot (protected)

## Usage

1. **First Time Users**:

   - Navigate to `http://localhost:3000`
   - Click "Sign Up" to create an account
   - Fill in username, email, and password
   - You'll be redirected to the chatbot after successful registration

2. **Returning Users**:

   - Navigate to `http://localhost:3000`
   - Click "Log In" to sign in
   - Enter your email and password
   - You'll be redirected to the chatbot after successful login

3. **Using the Chatbot**:
   - Once authenticated, you can interact with the chatbot
   - Your username will be displayed in the header
   - Click "Logout" to sign out

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:

   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - For Atlas, ensure your IP is whitelisted

2. **JWT Secret Error**:

   - Make sure you've set a strong JWT_SECRET in `.env`
   - Restart the server after changing environment variables

3. **CORS Errors**:

   - The server is configured to accept requests from `http://localhost:3000`
   - For production, update the CORS configuration in `server/index.js`

4. **Port Already in Use**:
   - Change the port in the `.env` file or kill the process using the port

### Development Tips

1. **Database Reset**: To clear all user data, drop the `chatbot_db` database
2. **Token Management**: Tokens are stored in localStorage and expire after 7 days
3. **Error Handling**: Check the browser console and server logs for detailed error messages

## Production Deployment

### Environment Variables for Production

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_production_secret
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

### Security Considerations

1. Use HTTPS in production
2. Set a strong JWT_SECRET
3. Use MongoDB Atlas or a secure database
4. Implement rate limiting
5. Add input validation and sanitization
6. Consider adding password reset functionality

## File Structure

```
project-1/
├── server/
│   ├── .env                    # Server environment variables
│   ├── index.js               # Main server file
│   ├── package.json           # Server dependencies
│   ├── models/
│   │   └── User.js           # User model
│   ├── routes/
│   │   └── auth.js           # Authentication routes
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   └── responses.json         # Chatbot responses
├── client/
│   ├── .env                   # Client environment variables
│   ├── package.json           # Client dependencies
│   └── src/
│       ├── App.js            # Main app component
│       ├── App.css           # Main styles
│       └── components/
│           ├── SignUp.js     # Sign up component
│           ├── Login.js      # Login component
│           ├── Chat.js       # Chat component
│           ├── ProtectedRoute.js # Route protection
│           └── Auth.css      # Authentication styles
└── README.md
```

This authentication system provides a secure, user-friendly way to manage access to your chatbot application.
