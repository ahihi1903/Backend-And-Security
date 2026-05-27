export function uploadAvatar(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.json({
    success: true,
    filename: req.file.filename,
    url: `http://localhost:3000/uploads/${req.file.filename}`,
  });
}
