const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "badminton-ai-server",
    message: "Badminton AI Coach server is running."
  });
});

app.post("/analyze", (req, res) => {
  res.json({
    ok: true,
    message: "Server connection works. AI video analysis will be connected next."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
