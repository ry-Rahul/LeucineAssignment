import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import EditModal from "./components/EditModal";
import SummarizeButton from "./components/SummarizeButton";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input.trim(), completed: false }]);
    setInput("");
    toast.success("Todo added!");
  };

  const handleDelete = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
    toast("Todo deleted", { icon: "🗑️" });
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditText(todos[idx].text);
  };

  const handleEditSave = () => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((t, i) => (i === editIdx ? { ...t, text: editText.trim() } : t))
    );
    setEditIdx(null);
    setEditText("");
    toast.success("Todo updated!");
  };

  const handleToggle = (idx) => {
    setTodos(
      todos.map((t, i) => (i === idx ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      // Here you would POST to your backend/Slack
      toast.success("Todos summarized and posted to Slack!");
    } catch (e) {
      toast.error("Failed to summarize and post to Slack.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center border border-red-500">
      <div className="w-50% h-full bg-white rounded-none shadow-none p-8 flex flex-col items-center border border-purple-100">
        <Toaster position="bottom-center" />
        <div className="w-full h-full bg-white rounded-none shadow-none p-8 flex flex-col items-center border border-purple-100">
          {/* Header */}
          <header className="w-full mb-2">
            <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-2">
              Todo Summary Assistant
            </h1>
            <p className="text-center text-gray-500 text-lg mb-2">
              Organize, track, and summarize your tasks
            </p>
          </header>
          {/* Add Todo Section */}
          <AddTodo input={input} setInput={setInput} onAdd={handleAdd} />
          {/* Todo List Section */}
          <TodoList
            todos={todos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
          {/* Summarize Button */}
          <SummarizeButton
            onClick={handleSummarize}
            disabled={todos.length === 0 || loading}
            loading={loading}
          />
        </div>
        {/* Edit Modal */}
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
