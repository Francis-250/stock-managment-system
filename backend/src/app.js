import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import stockRoutes from "./routes/stock.route.js";
import stockInRoutes from "./routes/stockIn.route.js";
import stockOutRoutes from "./routes/stockOut.route.js";
import stockMovementRoutes from "./routes/stockMovement.route.js";
import statsRoutes from "./routes/stats.route.js";
import reportRoutes from "./routes/report.route.js";
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
<<<<<<< HEAD
const allowedOrigins = [
  "http://localhost:5173",
  "https://stock-managment-system-1.onrender.com",
];
=======
const allowedOrigins = ["http://localhost:5173", "https://stock-managment-system-1.onrender.com"];

app.use((req, res, next) => {
  console.log('🌐 Request origin:', req.headers.origin);
  console.log('🍪 Cookies received:', req.cookies);
  next();
});

>>>>>>> 79a931b1648a27959345b4ee3c1c38bfc0866b95

app.use(
  cors({
    origin: function (origin, callback) {
<<<<<<< HEAD
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`❌ Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
=======
      if (!origin) {
        console.log('⚠️ No origin header');
        return callback(null, true);
      }
      
      console.log('🔍 Checking origin:', origin);
      
      if (allowedOrigins.includes(origin)) {
        console.log('✅ Origin allowed:', origin);
        callback(null, true);
      } else {
        console.log('❌ Origin blocked:', origin);
        callback(new Error('Not allowed by CORS'));
>>>>>>> 79a931b1648a27959345b4ee3c1c38bfc0866b95
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
<<<<<<< HEAD
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Cookie",
      "Set-Cookie",
    ],
=======
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Cookie", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"] 
>>>>>>> 79a931b1648a27959345b4ee3c1c38bfc0866b95
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/stock-ins", stockInRoutes);
app.use("/api/stock-outs", stockOutRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Stock Management API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
