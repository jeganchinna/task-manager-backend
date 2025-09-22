import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Supabase URL and API Key
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

// POST a new task
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

// Optional: Toggle task done
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .update({ done })
      .eq("id", id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
