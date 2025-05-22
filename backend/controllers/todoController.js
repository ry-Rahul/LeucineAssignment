import supabaseClient from "../index.js";
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = "AIzaSyC88K-_tEQrS9RWemvnWvCOzR4JSxqLgz0";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const getTodos = (req, res) => {
  supabaseClient
    .from("todos")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("Todos fetched:", data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Database error" });
    });
};

const addTodo = (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }
  const todo = {
    text: text.trim(),
    is_done: 0,
  };
  supabaseClient
    .from("todos")
    .insert([todo])
    .select()
    .then(({ data, error }) => {
      if (error) {
        console.error("Error inserting todo:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (!data || !Array.isArray(data) || data.length === 0) {
        return res
          .status(500)
          .json({ error: "Insert failed, no data returned" });
      }
      res.status(201).json(data[0]);
    })
    .catch((error) => {
      console.error("Error inserting todo:", error);
      res.status(500).json({ error: "Database error" });
    });
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  supabaseClient
    .from("todos")
    .delete()
    .eq("id", id)
    .then(({ data, error }) => {
      if (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Database error" });
    });
};

const editTodo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { text, is_done } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }
  supabaseClient
    .from("todos")
    .update({ text: text.trim(), is_done })
    .eq("id", id)
    .select()
    .then(({ data, error }) => {
      if (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(200).json(data[0]);
    })
    .catch((error) => {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Database error" });
    });
};

const summarizeTodo = async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from("todos")
      .select("*")
      .eq("is_done", 0);

    console.log("data", data);

    if (error) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ error: "Database error" });
    }
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(201).json({ summary: "All todos are completed" });
    }
    const allNotDoneTodos = data.map((todo) => todo.text);

    const text = `Here is a list of pending to-dos:\n\n${allNotDoneTodos.join(
      "\n"
    )}\n\nPlease generate a concise summary of the tasks. Group similar items, remove redundancy, and keep it under 3-4 sentences. Format the summary in a clear and actionable way.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{ role: "user", parts: [{ text }] }],
    });

    const summary =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    res.json({ summary });
  } catch (err) {
    console.error("Error in summarizeTodo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getTodos, addTodo, deleteTodo, summarizeTodo, editTodo };
