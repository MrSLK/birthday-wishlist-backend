import app from "./app";
import { connectDatabase } from "./config/database";
import config from "./config";

const PORT = config.port || 3000;

const start = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();