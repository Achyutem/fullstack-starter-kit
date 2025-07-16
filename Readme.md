## Full-Stack starter kit (React & Express with TypeScript)

This is a complete full-stack application demonstrating user registration and login functionality. The frontend is built with React, Vite, and TypeScript, and the backend is a Node.js/Express server, also using TypeScript, connected to a MySQL database.
✨ Features

    User Registration: New users can create an account.

    User Login: Existing users can sign in to access protected content.

    JWT-based Authentication: Secure authentication using JSON Web Tokens.

    Protected Routes: Frontend routes that are only accessible to authenticated users.

    TypeScript Integration: Fully typed codebase on both the frontend and backend for enhanced robustness and developer experience.

    Responsive UI: A clean and modern user interface built with Tailwind CSS.

🛠️ Technologies Used

Frontend:

    React

    TypeScript

    Vite

    Tailwind CSS

    ShadcnUI

    Axios

    React Router

Backend:

    Node.js

    Express.js

    TypeScript

    MySQL2

    JSON Web Token (JWT)

    bcrypt.js

    Dotenv

Development:

    Concurrently to run both servers with one command.

    Nodemon for live-reloading the backend server.

🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.
Prerequisites

    Node.js (v18.x or newer recommended)

    npm

    A running MySQL database instance.

Installation & Setup

    Clone the repository:

    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name

    Set up the Backend:

        Navigate to the backend directory:

        cd backend

        Install backend dependencies:

        npm install

        Create a .env file in the backend directory by copying the example:

        cp .env.example .env

        Update the .env file with your MySQL database credentials and a JWT secret:

        # Server Port
        PORT=4000

        # MySQL Database
        DB_HOST=localhost
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=your_db_name

        # JWT Secret
        JWT_SECRET=your-super-secret-key

        Database Schema: Connect to your MySQL database and run the following SQL command to create the users table:

        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    Set up the Frontend:

        Navigate to the frontend directory from the root:

        cd frontend

        Install frontend dependencies:

        npm install

Running the Application

From the root directory of the project, run the following command to start both the frontend and backend servers concurrently:

npm run dev

This will:

    Start the frontend development server (usually on http://localhost:5173).

    Start the backend server with live-reloading (on http://localhost:4000).

You can now open your browser and navigate to the frontend URL to use the application.
📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
