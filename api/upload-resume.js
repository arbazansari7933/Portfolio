import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = req.headers["x-upload-secret"];
  if (!secret || secret !== process.env.RESUME_UPLOAD_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    if (buffer.length === 0) {
      res.status(400).json({ error: "No file data received" });
      return;
    }

    const blob = await put("resume.pdf", buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/pdf",
    });

    res.status(200).json({ success: true, url: blob.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}