export default function errorHandler(err, req, res) {
  res.statusCode = err.status || 500;

  res.end(
    JSON.stringify({
      message: err.message || "Internal Server Error",
    }),
  );
}
