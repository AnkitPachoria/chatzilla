import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // ✅ CORS Middleware
import { app, server } from "./socket/socket.js"; // ✅ socket.js से इंपोर्ट कर रहे हैं
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("✅ Connected to MongoDB");
	} catch (error) {
		console.error("❌ MongoDB Connection Error:", error.message);
		process.exit(1);
	}
};

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ✅ CORS Enabled

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// ✅ Connect to DB before starting server
connectToMongoDB().then(() => {
	server.listen(PORT, () => {
		console.log(`✅ Server Running on port ${PORT}`);
	});
});
