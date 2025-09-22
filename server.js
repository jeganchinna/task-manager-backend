import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Supabase credentials
const supabaseUrl = "https://fdkxhivfbrbhelgvobhz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3hoaXZmYnJiaGVsZ3ZvYmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc4MjIsImV4cCI6MjA3NDEyMzgyMn0.iY6jP7kXBPLYawajUyGwiXOvU5_QKfC-DCzVzWeTH5E";
const supabase = createClient(supabaseUrl, supabaseKey);

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, done: false }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH task (update done or title)
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .update({ title, done })
      .eq("id", id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
