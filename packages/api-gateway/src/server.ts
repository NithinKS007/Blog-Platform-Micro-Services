import { logger } from "@blog-platform-micro-services/common";
import { app } from "./app";
import { envConfig } from "./config/env.config";

const startServer = () => {
  try {
    // redisService.connect();
    app.listen(envConfig.PORT, () => {
      logger.info(
        `Server is running on port ${envConfig.PORT} with service name "${envConfig.SERVICE_NAME}"`
      );
    });
  } catch (err: any) {
    logger.error(`Error starting server [ERROR] ${err.message}`);
    process.exit(1);
  }

//   const gracefulShutdown = async (signal: string): Promise<void> => {
//     console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

//     try {
//       await redisService.disconnect();
//       console.log("✅ Graceful shutdown completed");
//       process.exit(0);
//     } catch (error) {
//       console.error("❌ Error during graceful shutdown:", error);
//       process.exit(1);
//     }
//   };

//   process.on("SIGINT", () => gracefulShutdown("SIGINT"));
//   process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
};

startServer();
