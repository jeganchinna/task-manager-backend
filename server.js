import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// ---------------- Setup ----------------
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// ---------------- In-memory tasks store ----------------
let tasks = [
  { id: 1, title: "First task from Supabase", done: false },
  { id: 2, title: "Second task done", done: true },
];
let nextId = 3;

// ---------------- Routes ----------------

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const newTask = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle done
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  if ("done" in req.body) task.done = req.body.done;
  if ("title" in req.body) task.title = req.body.title;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).end();
});

// ---------------- Start server ----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
