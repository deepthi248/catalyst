import express from "express"
import db from './db.js'

const app = express();

app.get("/api/ping", (req, res) => {
  res.json({ok: true, message:"catalyst is running"})
});

app.listen(3001, ()=> console.log('server is running'))

