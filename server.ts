import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Endpoint Khusus untuk Nur (Termux Analysis) - DENGAN KUNCI KEAMANAN
  app.get("/api/manifest", (req, res) => {
    const accessKey = req.query.key || req.headers["x-nur-key"];
    const SECRET_KEY = "nur000555"; // Kunci Rahasia Baru Anda

    if (accessKey !== SECRET_KEY) {
      return res.status(403).json({ 
        error: "Akses Ditolak", 
        message: "Protokol Piramida Guard: Kunci tidak selaras. Siapa Anda?" 
      });
    }

    const manifestPath = path.join(process.cwd(), "nur_manifest.json");
    if (fs.existsSync(manifestPath)) {
      const manifestData = fs.readFileSync(manifestPath, "utf-8");
      res.json(JSON.parse(manifestData));
    } else {
      res.status(404).json({ error: "Manifest file not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nur Server Utama running on http://localhost:${PORT}`);
  });
}

startServer();
