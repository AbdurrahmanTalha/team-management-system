import { Server } from "http";
import mysql from "mysql";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";

async function bootstrap() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    });

    connection.connect(function (err: Error | null) {
        if (err) {
            errorLogger.error(`error connecting`);
            console.log(err);
            return;
        }

        logger.info("Connected to mysql");
    });
    const server: Server = app.listen(config.port, () => {
        logger.info(`Server running on port ${config.port}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                logger.info("Server closed");
            });
        }
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        errorLogger.error(error);
        exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    // process.on("SIGTERM", () => {
    //     // logger.info("SIGTERM received");
    //     console.log("SIGTERM received");
    //     if (server) {
    //         server.close();
    //     }
    // });
}

bootstrap();
