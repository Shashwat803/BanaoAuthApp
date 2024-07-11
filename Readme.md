# Node Express Project

This is a Node.js and Express application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a MongoDB database.
- You have set up an SMTP email account.

## Installing

To install the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Shashwat803/BanaoAuthApp.git
    ```

2. Navigate to the project directory:

    ```bash
    cd BananoAuthApp
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following environment variables:

    ```env
    SERVERPORT
    MONGO_URI
    JWTSCERET
    HOST
    PORT
    EMAIL
    PASSWORD
    ```

## Running the Project

To run the project, follow these steps:

1. Start the server with Nodemon:

    ```bash
    npm run dev
    ```

## Scripts

The following scripts are available:

- `start`: Runs the server.
- `dev`: Runs the server with Nodemon for development.

## Dependencies

The project uses the following dependencies:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: MongoDB object modeling for Node.js.
- `nodemailer`: Easy as cake email sending from your Node.js applications.
- `bcrypt`: A library to help you hash passwords.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `jsonwebtoken`: A library to create and verify JSON Web Tokens.
- `nodemon`: Simple monitor script for use during development of a Node.js app.

## Environment Variables

The project requires the following environment variables to be set:

- `SERVERPORT`: The port on which the server will run.
- `MONGO_URI`: The MongoDB connection string.
- `JWTSCERET`: The secret key for JWT authentication.
- `HOST`: The SMTP host.
- `PORT`: The SMTP port.
- `EMAIL`: The SMTP email address.
- `PASSWORD`: The SMTP email password.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you want to contact me, you can reach me at shashwatmishra803@gmail.com.
