
# Chat Application

This is a real-time chat application using NestJS for the backend and Vue.js for the frontend. It supports multiple chat rooms and private messaging.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- yarn (v1.2 or higher)

### Initial Setup

1. **Navigate to the project directory**:
    ```sh
    cd chatrealtime
    ```

### Backend Setup (NestJS)

1. **Navigate to the backend directory**:
    ```sh
    cd chat-server
    ```

2. **Install dependencies**:
    ```sh
    yarn install
    ```

3. **Start the backend server**:
    ```sh
    yarn start
    ```

   The server will run on [http://localhost:3001](http://localhost:3001).

### Frontend Setup (Vue.js)

1. **Navigate to the frontend directory**:
    ```sh
    cd client-server
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend server**:
    ```sh
    npm run dev
    ```

   The server will run on [http://localhost:8080](http://localhost:8080).

## Application Structure

### Backend (NestJS)

```
backend/
├── src/
│   ├── gateway/         # WebSocket handling (messages.gateway.ts)
│   ├── services/        # Business logic (messages.service.ts)
│   ├── dto/             # Data transfer objects (create-message.dto.ts)
│   └── entities/        # Data models (message.entity.ts)
│   └── main.ts          # Application entry point
```

### Frontend (Vue.js)

```
frontend/
├── src/
│   ├── components/      # Vue components
│   ├── App.vue          # Main Vue component
│   └── main.js          # Application entry point
└── public/              # Public assets
```

## WebSocket Events

- **createMessage**: Sent when a user sends a message.
- **findAllMessages**: Sent to get all messages for a room.
- **join**: Sent when a user joins a room.
- **leaveRoom**: Sent when a user leaves a room.
- **typing**: Sent when a user is typing.
- **findMessagesBetweenUsers**: Sent to get direct messages between users.

## Assumptions and Limitations

### Assumptions

- Users are identified by unique names.
- Stable internet connection for WebSocket.

### Limitations

- No authentication mechanism.
- In-memory message storage (messages lost on server restart).
- Minimal UI/UX.

## License

This project is licensed under the MIT License.
