import {
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiCircle,
  FiPlus,
} from "react-icons/fi";

export default function TodoList({ todos, onEdit, onDelete, onToggle }) {
  const completedCount = todos.filter((t) => t.completed).length;
  return (
    <div className="w-full bg-gray-100 rounded-2xl shadow-inner p-0 mb-4 flex flex-col gap-0">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 rounded-t-2xl bg-gray-50">
        <span className="font-semibold text-gray-700">
          Your Todos ({todos.length})
        </span>
        {todos.length > 0 && (
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
            {completedCount} completed
          </span>
        )}
      </div>
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <div className="bg-gray-200 rounded-full p-4 mb-2">
            <FiPlus size={36} />
          </div>
          <div className="text-center text-base">
            No todos yet. Add some above!
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-90 overflow-y-auto px-2 py-3">
          {todos.map((todo, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100 transition group ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <button
                className="mr-3 text-purple-500 hover:text-purple-700 focus:outline-none"
                onClick={() => onToggle(idx)}
                aria-label={
                  todo.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {todo.completed ? (
                  <FiCheckCircle size={22} />
                ) : (
                  <FiCircle size={22} />
                )}
              </button>
              <span
                className={`flex-1 text-gray-800 text-base ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition">
                <button
                  className="text-purple-600 hover:bg-purple-100 rounded p-1"
                  onClick={() => onEdit(idx)}
                  aria-label="Edit Todo"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  className="text-red-500 hover:bg-red-100 rounded p-1"
                  onClick={() => onDelete(idx)}
                  aria-label="Delete Todo"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
