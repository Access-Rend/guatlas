const express = require("express");
const app = express();
const fs = require("fs");
const readdir = require("@jsdevtools/readdir-enhanced");
const { dir } = require("console");
const db_path = "../public/db/";
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

const tree_dir = (path = "", depth = 1) => {
  let dir_list = fs.readdirSync(path);
  if (depth <= 1) return dir_list;

  dir_list = dir_list.map((name, idx) => {
    if (fs.statSync(path + "/" + name).isDirectory())
      return { [name]: tree_dir(path + "/" + name, depth - 1) };
    else return name;
  });

  return { [path.split("/").filter(Boolean).pop()]: dir_list };
};

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

app.get("/api/tree/", (req, res) => {
  let r = tree_dir(db_path + req.query["path"], req.query["depth"]);
  r = r[Object.keys(r)[0]];
  r = Object.keys(r).map((key) => {
    return { [Object.keys(r[key])]: r[key][Object.keys(r[key])] };
  });
  res.json(r);
});

app.get("/api/db/*", (req, res) => {
  const path = `${db_path} / ${req.path.split("/").slice(3).join("/") + "/"}`;
  const deep = parseInt(req.query.deep);
  res.json(listDirectory(path, deep));
});

app.listen(8890, () => {
  console.log("Server start at 8090");
});
