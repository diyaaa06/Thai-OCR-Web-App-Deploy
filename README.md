# Thai OCR Web Application


Deployment Link
1. cyclic: https://determined-dove-capris.cyclic.app/
2. render: https://thai-ocr-web-app.onrender.com/


This project is a web application designed to perform Optical Character Recognition (OCR) on Thai national ID cards. The application consists of a frontend built with React (client-side) and a backend server developed using Node.js, Express, and MongoDB.

## Project Structure

The project is structured with a client-server architecture. The client folder holds the frontend React application, while the server folder contains the backend server code.

- `client/`: Contains the React frontend code.
- `server/`: Contains the backend Node.js server code.

## Getting Started

### Prerequisites

- Node.js (recommended version)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Thai-OCR-Web-App.git
    ```

2. Navigate to the server directory and install server dependencies:

    ```bash
    cd Thai-OCR-Web-App/server
    npm install
    ```

3. Copy the production build from the client to the server:

    ```bash
    cp -r ../client/build ./client
    ```

### Usage

1. Set up environment variables (if required) in the server `.env` file.

2. Start the application:

    ```bash
    cd Thai-OCR-Web-App/server
    npm start
    ```

    This command will start the server and serve the production build of the React frontend.

3. Access the application in your browser:

    The application will be available at `http://localhost:3001` by default.

## Deployment

The application can be deployed to platforms like Cyclic.sh, AWS, or any other hosting service that supports Node.js applications.

1. Create a production build for the React frontend:

    ```bash
    cd Thai-OCR-Web-App/client
    npm run build
    ```

    This will generate a production-ready build inside the `client/build` directory.

2. Copy the contents of the `client/build` folder to the `server/client` folder:

    ```bash
    cp -r build ../server/client
    ```

3. Deploy the server directory to your preferred hosting service.

## Contributing

Contributions and suggestions are welcome. Please feel free to open issues or submit pull requests for any improvements or features.



