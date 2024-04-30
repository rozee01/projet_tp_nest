# NestJS Google Classroom Clone Backend

[![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red.svg)](https://nestjs.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-communication-blue.svg)](https://en.wikipedia.org/wiki/WebSocket)
[![Docker](https://img.shields.io/badge/Docker-containerization-blue.svg)](https://www.docker.com/)

🚀 Welcome to the backend repository of our Google Classroom clone built with NestJS, WebSocket, and Docker!

## Features

- **Real-time Communication And Nortification System**: Utilizing WebSockets for real-time interactions and implementation of file sharing and notification systems
- **Scalable Architecture**: Built on top of NestJS for scalability and maintainability.
- **Containerized Deployment**: Dockerized for easy deployment and management.
- **RESTful APIs**: Provides a robust set of APIs for managing classroom activities.

## Services

- PgAdmin: `http://localhost:5050`

PgAdmin Login:

    - email: admin@admin.com
    - password: pgadmin4

- Backend: `http://localhost:3000`
- Access the WebSocket server at `ws://localhost:3000`.
- Swagger documentation is available under `http://localhost:3000/api`.
- To generate and download a Swagger JSON file, navigate to `http://localhost:3000/api-json`.

## Monitoring

Best way to moniter your containers is through the docker desktop application, go to containers sections and open the container you are interested in to see logs, have an ssh access, or to check stats.

## Installation

Make sure you have Docker and Node.js installed.

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Create the `.env` file and fill the variables:

    - follow the structure found in the `.env.example` depending on whether you are using it for dev or prod.
    - fill in the hostname, password and credentials from the dockerfile
    - run this command to get a secret key

    ```bash
    node -p "require('crypto').randomBytes(64).toString('hex');"
    ```

5. Run `docker-compose up` to start the Docker containers.

## Run this Lab

- `docker-compose up` to start all images and run the Servers and Services.
- `docker-compose up <SERVICE-NAME>` to start only the desired image.
- `docker-compose down -v --rmi all --remove-orphans` to close the images and clean things up.
- `docker-compose down` to only close the images.

## NOTE

To enforce conform style and to avoid errors/bugs/vulunrabilities that can be identified by the **Linter**, please, use `npm run lint` in both the Backend and Frontend before making any commits.

Please use `npm run format` too, to enforce style.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests.

## Acknowledgments

- Hat tip to anyone whose code was used.
- Thanks to the NestJS, WebSocket, and Docker communities for their fantastic tools.

🌟 Star this repository if you found it helpful!
