const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Replace these with your Supabase project details
const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

// Get all tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");
  res.json({ data, error });
});

// Add task
app.post("/tasks", async (req, res) => {
  const { task } = req.body;
  const { data, error } = await supabase.from("tasks").insert([{ task }]);
  res.json({ data, error });
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase.from("tasks").update({ status }).eq("id", id);
  res.json({ data, error });
});

app.listen(3000, () => console.log("Server running on port 3000"));
