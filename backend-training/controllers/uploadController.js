import logger from "../utils/logger.js";
import crypto from "crypto";
import path from "path";
import sharp from "sharp";

export async function uploadAvatar(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filename = `${crypto.randomUUID()}.jpg`;
  const outputPath = path.resolve("uploads", filename);

  await sharp(req.file.buffer, {
    limitInputPixels: 25_000_000,
  })
    .rotate()
    .resize(1000, 1000, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85 })
    .toFile(outputPath);

  logger.info("Avatar uploaded", {
    filename,
    size: req.file.size,
    userId: req.user.id,
  });

  return res.status(201).json({
    success: true,
    filename,
    url: `http://localhost:3000/uploads/${filename}`,
  });
}
