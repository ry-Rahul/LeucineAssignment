import { FiX, FiSave } from "react-icons/fi";

export default function EditModal({ editText, setEditText, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={22} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <input
          className="w-full rounded border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSave()}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
            onClick={onSave}
          >
            <FiSave size={18} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
