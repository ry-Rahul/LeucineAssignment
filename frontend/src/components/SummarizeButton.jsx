import { FiSend } from "react-icons/fi";

export default function SummarizeButton({ onClick, disabled, loading }) {
  return (
    <button
      className="w-full max-w-md bg-green-600 text-purple-600 py-3 rounded font-semibold text-lg hover:bg-green-700 transition mb-4 disabled:opacity-60 flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <FiSend size={22} color="#9333ea" />
      )}
      {loading ? "Summarizing..." : "Summarize Todos"}
    </button>
  );
}
