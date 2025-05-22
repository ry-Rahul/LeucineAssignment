import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes.js";
import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY."
  );
}
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default supabaseClient;
