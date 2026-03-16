import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Simpan ke Google Drive
  app.post("/api/drive/upload", async (req, res) => {
    const { content, fileName } = req.body;

    try {
      const auth = new google.auth.JWT({
        email: process.env.DRIVE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ["https://www.googleapis.com/auth/drive.file"]
      });

      const drive = google.drive({ version: "v3", auth });

      const fileMetadata = {
        name: fileName || `Analisis-Mubin-${Date.now()}.md`,
        parents: process.env.DRIVE_FOLDER_ID ? [process.env.DRIVE_FOLDER_ID] : [],
      };

      const media = {
        mimeType: "text/markdown",
        body: content,
      };

      const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id, webViewLink",
      });

      res.json({ success: true, fileId: file.data.id, link: file.data.webViewLink });
    } catch (error: any) {
      console.error("Drive Upload Error:", error);
      res.status(500).json({ success: false, error: error.message });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
