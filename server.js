import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: "First task from Supabase", done: false },
  { id: 2, title: "Second task done", done: true }
];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const id = tasks.length + 1;
  const newTask = { id, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT task (update title or done)
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, done } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
