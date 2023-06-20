const express = require("express");
const app = express();
const fs = require("fs");
const readdir = require("@jsdevtools/readdir-enhanced");

// const csv = require("csv-parser");
// const results = [];

// const PocketBase = require("pocketbase/cjs");
// const pb = new PocketBase("http://127.0.0.1:8090");

// fs.createReadStream(
//   "../public/DB/1.Cellmap-search/03.all-sample-group-category-20230606.csv"
// )
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", async () => {
//     for (let i = 0; i < results.length; i++) {
//       await pb
//         .collection("03_all_sample_group_category_20230606")
//         .create(results[i]);
//     }
//     console.log("Import done");
//   });

function listDirectory(path, deep) {
  try {
    const files = readdir.readdirSync(path, { deep });
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
  const deep = parseInt(req.query.deep);
  res.json(listDirectory(path, deep));
});

app.listen(51730);
