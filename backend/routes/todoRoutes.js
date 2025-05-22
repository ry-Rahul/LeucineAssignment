import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
  summarizeTodo,
} from "../controllers/todoController.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", editTodo)
router.post("/summarize", summarizeTodo);

export default router;
