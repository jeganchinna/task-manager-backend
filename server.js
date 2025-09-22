const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Use env vars
const supabase = createClient(
  process.env.URL,
  process.env.API
);

// Simple route to test
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});

// Example: fetch tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
