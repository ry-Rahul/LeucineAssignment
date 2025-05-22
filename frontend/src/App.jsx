import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import EditModal from "./components/EditModal";
import SummarizeButton from "./components/SummarizeButton";
import { Toaster, toast } from "react-hot-toast";
import api from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodoData = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    try {
      const newTodo = await api.addTodo(input.trim());
      setTodos([...todos, newTodo]);
      setInput("");
      toast.success("Todo added!");
    } catch {
      toast.error("Failed to add todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete todo");
    }
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditText(todos[idx].text);
  };

  const handleEditSave = async () => {
    if (!editText.trim()) return;
    try {
      const todo = todos[editIdx];
      const updated = await api.editTodo(
        todo.id,
        editText.trim(),
        todo.is_done
      );
      setTodos(todos.map((t, i) => (i === editIdx ? updated : t)));
      setEditIdx(null);
      setEditText("");
      toast.success("Todo updated!");
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const handleToggle = async (idx) => {
    try {
      const todo = todos[idx];
      const updated = await api.editTodo(todo.id, todo.text, !todo.is_done);
      setTodos(todos.map((t, i) => (i === idx ? updated : t)));
    } catch {
      toast.error("Failed to toggle todo");
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const { summary } = await api.summarizeTodo();
      toast.success(summary, { duration: 5000 });
    } catch {
      toast.error("Failed to summarize todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
      <div className="w-50% h-full bg-white rounded-none shadow-none p-8 flex flex-col items-center border border-purple-100">
        <Toaster position="bottom-center" />
        <div className="w-full h-full bg-white rounded-none shadow-none p-8 flex flex-col items-center border border-purple-100">
          <header className="w-full mb-2">
            <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-2">
              Todo Summary Assistant
            </h1>
            <p className="text-center text-gray-500 text-lg mb-2">
              Organize, track, and summarize your tasks
            </p>
          </header>
          <AddTodo input={input} setInput={setInput} onAdd={handleAdd} />
          <TodoList
            todos={todos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
          <SummarizeButton
            onClick={handleSummarize}
            disabled={todos.length === 0 || loading}
            loading={loading}
          />
        </div>
        {editIdx !== null && (
          <EditModal
            editText={editText}
            setEditText={setEditText}
            onSave={handleEditSave}
            onClose={() => setEditIdx(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
