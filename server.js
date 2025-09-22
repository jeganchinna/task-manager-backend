// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: 1, title: "First task from Supabase", done: false },
  { id: 2, title: "Second task done", done: true },
];
let nextId = 3;

// Get all tasks
app.get("/tasks", (req, res) => res.json(tasks));

// Add task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const newTask = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task (toggle done or edit title)
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
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
