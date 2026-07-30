import express from "express";
import cors from "cors";
import giftRoutes from "./routes/gift.routes";

const app = express();


// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  " https://lalosbirthdaywishlist.netlify.app" // Production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true // allow cookies/auth headers
  })
);

app.use(express.json());

app.use("/gifts", giftRoutes);

export default app;