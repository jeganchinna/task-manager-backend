import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Supabase credentials
const supabaseUrl = "https://fdkxhivfbrbhelgvobhz.supabase.co"; // your URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3hoaXZmYnJiaGVsZ3ZvYmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc4MjIsImV4cCI6MjA3NDEyMzgyMn0.iY6jP7kXBPLYawajUyGwiXOvU5_QKfC-DCzVzWeTH5E"; // your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Get tasks for a user
app.get("/tasks", async (req, res) => {
  const user_id = req.query.user_id;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add task
app.post("/tasks", async (req, res) => {
  const { title, user_id } = req.body;
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, done: false, user_id }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Update task
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  const { data, error } = await supabase
    .from("tasks")
    .update({ title, done })
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
