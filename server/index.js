import express from "express";
import db from "./db.js";

const app = express();

app.use(express.json());
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "catalyst is running" });
});

app.get("/api/jobs", (req, res) => {
  try {
    const get_all_jobs_query = `SELECT * FROM jobs`;
    const jobs = db.prepare(get_all_jobs_query).all();

    res.json({ ok: true, data: jobs });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Failed to fetch Jobs" });
  }
});

app.post("/api/jobs", (req, res) => {
  try {
    const job = req.body;

    if (!job.companyName || !job.role || !job.status) {
      return res
        .status(400)
        .json({
          ok: false,
          message: "companyName, role and status are required",
        });
    }
    const insert_jobs_query = `
      INSERT INTO jobs (id, user_id, company, role, status, url, notes, jd_text, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.prepare(insert_jobs_query).run(
      job.id,
      job.user_id,
      job.companyName,
      job.role,
      job.status,
      job.url,
      job.notes,
      job.jobDescription,
      new Date().toISOString(),
    );

    res.json({ ok: true, data: job });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Failed to post Jobs" });
  }
});

app.patch("/api/jobs/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const update_status_query = `UPDATE jobs SET status = ? WHERE id = ?`;
    console.log(status, id);
    const updated_job = db.prepare(update_status_query).run(status, id);
    res.json({ ok: true, message: "Status updated", data: updated_job }); // ← this line is missing
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Failed to update status", error: error });
  }
});

app.delete("/api/jobs/:id", (req, res) => {
  try {
    const id = req.params.id;
    const delete_job_query = `DELETE FROM jobs WHERE id = ?`;

    const data = db.prepare(delete_job_query).run(id);

    res.json({ ok: true, message: "successfully deleted job", data: data });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Failed to delete job", error: error });
  }
});

app.put("/api/jobs/:id", (req, res) => {
  try {
    const id = req.params.id;
    const job_to_be_updated = req.body;
    const update_job_query = `UPDATE jobs SET
    company= ? ,role = ? ,status=? 
    ,url=?  ,notes = ? ,jd_text = ? WHERE id= ?`;

    const updated_job = db
      .prepare(update_job_query)
      .run(
        job_to_be_updated.companyName,
        job_to_be_updated.role,
        job_to_be_updated.status,
        job_to_be_updated.url,
        job_to_be_updated.notes,
        job_to_be_updated.jobDescription,
        id,
      );

    res.json({ ok: true, data: updated_job });
  } catch (error) {
    res.json({ ok: false, message: "Failed to update status" });
  }
});

app.listen(3001, () => console.log("server is running"));
