const express = require("express");
const router = express.Router();
const db = require("../db");
const { Parser } = require("json2csv");

// Get all tasks
router.get("/", (req, res) => {
  const { status, priority, sortBy } = req.query;
  let q = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (status) {
    q += " AND status=?";
    params.push(status);
  }
  if (priority) {
    q += " AND priority=?";
    params.push(priority);
  }
  q += sortBy ? ` ORDER BY ${sortBy}` : " ORDER BY id DESC";

  db.query(q, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a task 
router.post("/", (req, res) => {
  let { title, description, status, priority, due_date } = req.body;

  if (due_date) {
  try {
    due_date = due_date.split("T")[0];
  } catch {
    due_date = null;
  }
}
  const q =
    "INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [title, description, status, priority, due_date], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Task added successfully" });
  });
});

// Update a task 

router.put("/:id", (req, res) => {
  let { title, description, status, priority, due_date } = req.body;

  
  if (due_date) {
  try {
    
    due_date = due_date.split("T")[0];
  } catch {
    due_date = null;
  }
}


  console.log("Final values being sent to DB:", {
    title,
    description,
    status,
    priority,
    due_date,
    id: req.params.id,
  });

  const q = `
    UPDATE tasks 
    SET title=?, description=?, status=?, priority=?, due_date=? 
    WHERE id=?`;

  db.query(
    q,
    [title, description, status, priority, due_date, req.params.id],
    (err, result) => {
      if (err) {
        console.error("DB error during update:", err);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Task not found or no changes made" });
      }

      res.json({ message: "Task updated successfully" });
    }
  );
});


// Delete task
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Task deleted successfully" });
  });
});

// Export CSV
router.get("/export", (req, res) => {
  const { status, priority } = req.query;
  let q = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (status) {
    q += " AND status=?";
    params.push(status);
  }
  if (priority) {
    q += " AND priority=?";
    params.push(priority);
  }

  db.query(q, params, (err, results) => {
    if (err) return res.status(500).send(err);

    if (!results || results.length === 0) {
      return res.status(400).send("No tasks found to export.");
    }

    try {
      const fields = Object.keys(results[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(results);

      res.header("Content-Type", "text/csv");
      res.attachment("tasks.csv");
      res.send(csv);
    } catch (error) {
      console.error("CSV generation failed:", error);
      res.status(500).send("Error generating CSV");
    }
  });
});

module.exports = router;
