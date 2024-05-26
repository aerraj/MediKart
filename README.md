# MediKart - A Full Stack Online HealthCare Shop

MediKart is a comprehensive MERN stack project designed to offer a seamless online shopping experience for healthcare products. This project features dedicated collections for healthcare items, users, order history, and includes a variety of user-friendly functionalities like add to cart, search bar, and checkout.

👉 Live Demo: <a href='https://medikartwebsite.vercel.app/'>MediKart Demo</a> Sample id:{email:dg00461@gmail.com password:dg00461}

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Others](#others)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [Data Handling](#data-handling)


## Features
- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Product Management**: Add, view, and search for healthcare products.
- **Cart Functionality**: Add items to the cart, view cart, and proceed to checkout.
- **Order History**: View past orders and their details.
- **Notifications**: Real-time notifications using react-hot-toast.

## Tech Stack

### Front-end
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server for React.
- **Bootstrap 5**: Modern and responsive design framework.
- **JavaScript**: Programming language for dynamic content.
- **HTML & CSS**: Markup and styling of the application.

### Back-end
- **MongoDB Atlas**: Cloud database solution.
- **Express**: Web application framework for Node.js.
- **Node.js**: JavaScript runtime for server-side development.

### Others
- **Bcrypt.js**: Secure password storage.
- **JWT**: JSON Web Tokens for session maintenance.
- **Express Validator**: Middleware for validating request data.
- **Context API**: State management for React.
- **React Hooks**: `useEffect`,`useReducer` and `useState` for managing component lifecycle and state.
- **React-hot-toast**: Notifications for user interactions.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MediKart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MediKart
   ```
3. Install dependencies for both client and server:
   ```bash
   npm install
   cd frontend
   npm install
   cd backend
   ```

## Usage
1. Start the server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the client:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

## Project Structure
```
MediKart/
│
├── client/                 # Front-end code
│   ├── public/             # Public assets
│   └── src/                # Source code
│       ├── components/     # React components
│       ├── screens/        # React Screens
│       └── Modal.jsx       # React Cart view
│
├── server/                 # Back-end code
│   ├── config/             # Configuration files
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   └── Database/           # Database
│
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## API Endpoints
- **User Routes**:
  - POST `/api/createUser`: Register a new user.
  - POST `/api/loginUser`: Authenticate a user and return a JWT.
- **Product Routes**:
  - GET `/api/displayData`: Fetch all products data.
- **Order Routes**:
  - POST `/api/orderData`: Create a new order.
  - GET `/api/myorderData`: Fetch all orders for a specific user.

## User Authentication
User authentication is implemented using JWT (JSON Web Tokens). Passwords are hashed using bcrypt for secure storage. Upon successful login, a token is generated and stored in the client's local storage to maintain the session.

## Data Handling
The application segregates user-specific data to ensure personalized experiences. The product data is maintained on the back-end and is fetched from the front-end using API calls. Each user's order history and cart data are managed individually to provide a tailored shopping experience.
---

Thank you for using MediKart! We hope you have a smooth and enjoyable shopping experience. If you have any questions or feedback, feel free to reach out.
