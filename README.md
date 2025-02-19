# Blood Bank Management

The Blood Management System is a web-based application designed to manage blood donations, patient requests, and overall blood inventory. It provides interfaces for donors, patients, and administrators to interact with the system efficiently.
## Features

- User-friendly interface for donors and patients
- Secure admin login and dashboard
- Blood donation management
- Patient blood request handling
- Real-time blood inventory tracking
- Donor and patient information management

## Requirements

- Frontend: React.js
- Backend: Node.js with Express.js
- Databases: MongoDB and MySQL
- Additional libraries: React Router, Mongoose, mysql2

## Installation

1. Clone the repository:
   
git clone [https://github.com/003saad/blood-bank-management.git](https://github.com/003saad/blood-bank-management.git)

2. Navigate to the project directory:

cd blood-bank-management

3. Set up the frontend:

cd ../frontend npm install

4. Set up the backend:

cd backend npm install

5. Create a copy of the `.env.example` file and rename it to `.env`:

cp .env.example .env

6. In a new terminal, start the frontend development server:

cd ../frontend npm start

7. Configure your database in the `.env` file:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password


## Usage
1. Start the development server:
   cd frontend
   npm run dev
   cd backend
   nodemon

3. Visit `http://localhost:8000` in your web browser.

4. Register a new account or log in with existing credentials.

5. Start managing your tasks!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
