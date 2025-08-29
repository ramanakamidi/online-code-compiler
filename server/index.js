const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Compiler API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const axios = require("axios");

app.post("/run", async (req, res) => {
  const { code, language } = req.body;

  // JDoodle requires language names in a specific format
  const langMap = {
    python: "python3",
    cpp: "cpp17",
    java: "java",
  };

  try {
    const result = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "31503cf5de680e10fe46c241bed8024c",
      clientSecret: "71da0e1c790b1e7f62b78c43af02456ada5cfa5c3d96a4d5c9c4df238c7c2f53",
      script: code,
      language: langMap[language] || "python3",
      versionIndex: "0",
    });

    res.json({ output: result.data.output });
  } catch (error) {
    console.error("Execution error:", error.response?.data || error.message);
    res.status(500).json({ output: "Error running code." });
  }
});
