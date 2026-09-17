const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024
  }
});

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "badminton-ai-server",
    message: "Badminton AI Coach server is running."
  });
});

app.post("/analyze", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      ok: false,
      message: "動画ファイルがありません。"
    });
  }

  res.json({
    ok: true,
    message: "動画をサーバーで受け取りました！",
    filename: req.file.originalname,
    size: req.file.size
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
