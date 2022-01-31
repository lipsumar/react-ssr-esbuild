import app from "./app";

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log(`> server ready on http://localhost:${PORT}`);
});
