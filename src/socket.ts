// Inside socket.ts
import { Server as SocketIOServer, Socket } from "socket.io";
import { errorLogger, logger } from "./shared/logger";
import { Server } from "http";

let io: SocketIOServer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeSocketIO = (server: Server) => {
    io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST", "PATCH", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket: Socket) => {
        logger.info("A user connected to Socket.IO");

        socket.on("disconnect", () => {
            errorLogger.error("A user disconnected from Socket.IO");
        });
    });
};

export const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized.");
    }
    return io;
};
