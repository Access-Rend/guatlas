const express = require("express");
const app = express();
const fs = require("fs");
const readdir = require("@jsdevtools/readdir-enhanced");
const { dir } = require("console");
const { type } = require("os");
const db_path = '../public/db/'


const tree_dir = (path = '', depth = 1) => {
  let dir_list = fs.readdirSync(path)
  if(depth <= 1){
    return dir_list
  }

  dir_list = dir_list.map((name, idx) => {
    if(fs.statSync(path + '/' + name).isDirectory())
      return {[name] : tree_dir(path + '/' + name, depth-1)}
    else 
      return name
  })

  return {[path.split('/').filter(Boolean).pop()] : dir_list}
}

app.get("/api/tree/", (req,res) => {

  let r = tree_dir(db_path + req.query['path'], req.query['depth'])
  if(req.query['depth'] > 1) {
    r = r[Object.keys(r)[0]]
    r = Object.keys(r).map((key)=>{
      return {[Object.keys(r[key])] : r[key][Object.keys(r[key])]}
    })
  }
  res.json(r)
})

app.get("/api/db/*", (req, res) => {
  const path = `${db_path} / ${req.path.split("/").slice(3).join("/") + "/"}`;
  const deep = parseInt(req.query.deep);
  res.json(listDirectory(path, deep));
})

app.listen(51730);
