import express from "express";
import ssr from "./ssr";
import path from "path";
import dataLoaders from "./dataLoaders";

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  setTimeout(next, 1000);
});

app.get("/ssr/data/:keys", async (req, res) => {
  const dataKeys = req.params.keys.split(",");
  const data = await Promise.all(
    dataKeys.map(async (key) => ({ key, data: await dataLoaders[key]() }))
  );
  res.send(data);
});

app.get("/*", async (req, res) => {
  const { props, html, helmet } = await ssr(req.originalUrl);

  res.render("index", {
    appHtml: html,
    appData: props,
    helmet,
  });
});

export default app;
