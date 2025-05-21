import { FiPlus } from "react-icons/fi";

export default function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="w-full flex gap-2 mb-4">
      <input
        className="flex-1 rounded-lg border border-purple-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 shadow-sm placeholder-gray-400"
        type="text"
        placeholder="Add a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      />
      <button
        className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={onAdd}
        aria-label="Add Todo"
      >
        <FiPlus size={22} color="#9333ea" />
        <span className="hidden sm:inline text-purple-600">Add</span>
      </button>
    </div>
  );
}
