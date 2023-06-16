const express = require("express");
const app = express();
const fs = require("fs");

function listDirectory(path) {
  try {
    const files = fs.readdirSync(path);
    return files.map((file) => {
      if (fs.statSync(`${path}/${file}`).isDirectory()) {
        return file + "/";
      } else {
        return file;
      }
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

app.get("/api/db/*", (req, res) => {
  const path = `../public/db/${req.path.split("/").slice(3).join("/") + "/"}`;
  res.json(listDirectory(path));
});

app.listen(51730);
