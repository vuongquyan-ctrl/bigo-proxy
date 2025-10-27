import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// ===== ROUTE CHÍNH =====
app.get("/api", async (req, res) => {
  const id = req.query.bigoId;
  if (!id) return res.status(400).json({ error: "Thiếu bigoId" });

  try {
    const resp = await fetch("https://ta.bigo.tv/official_website_tiebar/anchor/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "https://www.bigo.tv",
      },
      body: JSON.stringify({ bigoId: id }),
    });

    const data = await resp.json();
    res.json(data.data || data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== KHỞI CHẠY SERVER =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy BIGO đang chạy trên cổng ${PORT}`);
});
