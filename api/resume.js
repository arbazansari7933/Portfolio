import { head } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const blobInfo = await head("resume.pdf");
    const response = await fetch(blobInfo.url);
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Arbaz_Ansari_Resume.pdf"'
    );
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(404).json({ error: "Resume not found. Upload one first." });
  }
}