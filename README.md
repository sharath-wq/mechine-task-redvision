# Online Bookstore Application with MERN Stack

This repository features an online bookstore application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can browse, search, and view book details, while performing CRUD operations on the backend. The application includes authentication with JWT, error handling, and security measures. The frontend, developed with React and Vite, provides a user-friendly interface for book management and cart functionality, with roles for admin and user, allowing admins to manage books and view checkout lists, and users to add books to their cart and checkout.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Full CRUD functionality
-   Responsive design
-   RESTful API
-   Modern front-end framework (React with Vite)
-   State management with React Context API or Redux

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js
-   npm (Node Package Manager) or yarn
-   MongoDB

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/sharath-wq/mechine-task-redvision.git
    cd mechine-task-redvision
    ```

2. Navigate to the backend directory:

    ```sh
    cd server
    ```

3. Install backend dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
    ADMIN_EMAIL=your_admin_email
    MONGO_URI=your_mongodb_connection_string
    JWT_KEY=your_jwt_secret_key
    ```

5. Cookie session goto app.ts file and uncommnend the development config and commend the produciton config

    ```
    // uncomment this on development envorment
    // app.use(
    //     cookieSession({
    //         signed: false,
    //         secure: false,
    //     })
    // );

    // on production
    app.use(
        cookieSession({
            signed: false,
            secure: process.env.NODE_ENV !== 'test',
            sameSite: 'none',
        })
    );
    ```

6. Start the backend server:

    ```sh
    npm run start-dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ../client
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

    ```plaintext
    VITE_API_URL=http://localhost:5000/api
    VITE_UPLOADPRESET=your_cloudinary_upload_preset
    VITE_CLOUDNAME=your_cloudinary_cloudname
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Running the Application

To run the application locally, follow these steps:

1. Start the backend server:

    ```sh
    cd backend
    npm run start-dev
    ```

2. Start the frontend development server:

    ```sh
    cd ../frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

### Authentication

-   `POST /api/signin` - Sign in a user.
-   `POST /api/signout` - Sign out a user.
-   `POST /api/signup` - Sign up a new user.

### Books

-   `POST /api/books` - Create a new book.
-   `PUT /api/books/:id` - Update an existing book.
-   `DELETE /api/books/:id` - Delete a book.
-   `GET /api/books` - Get all books.
-   `GET /api/books/:id` - Get a single book by ID.
-   `GET /api/books/options` - Get book options.

### Cart

-   `PUT /api/cart` - Update cart.
-   `GET /api/cart` - View cart.

### Orders

-   `POST /api/orders` - Create a new order.
-   `GET /api/orders` - View orders.
