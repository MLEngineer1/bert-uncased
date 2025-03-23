import express from "express";
import bodyParser from "body-parser";
import { analyzeText } from "./analyzer.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Text Analysis Service is running.");
});

// Analyze Text Endpoint
app.post("/analyze", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Please provide 'text' in the request body." });
  }

  const result = analyzeText(text);
  res.json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
