import { useState } from "react";
import { useCatFact } from "./hooks/useCatFact";
import { useCatFactHistory } from "./hooks/useCatFactHistory";
import { FactView } from "./components/FactView";
import { HistoryView } from "./components/HistoryView";
import { ErrorMessage } from "./components/ErrorMessage";

function App() {
  const [error, setError] = useState<string | null>(null);

  const {
    history,
    showHistory,
    historyLoading,
    handleToggleHistory,
    refreshHistoryIfVisible,
  } = useCatFactHistory(setError);
  const { text, loading, handleFetch } = useCatFact(
    setError,
    refreshHistoryIfVisible,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-xl font-semibold text-slate-900 mb-1">
            Cat Fact Generator
          </h1>

          <FactView fact={text} />

          <button
            onClick={handleFetch}
            disabled={loading}
            className="mt-6 w-full bg-slate-900 text-white rounded-lg py-2.5 font-medium
                       hover:bg-slate-800 active:bg-slate-950
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? "Fetching..." : "Get cat fact"}
          </button>

          <button
            onClick={handleToggleHistory}
            disabled={historyLoading}
            className="mt-2 w-full text-slate-500 text-sm py-2 font-medium
                       hover:text-slate-700 disabled:opacity-40 transition-colors"
          >
            {historyLoading
              ? "Loading..."
              : showHistory
                ? "Hide history"
                : "Show history"}
          </button>

          {error && <ErrorMessage message={error} />}

          {showHistory && <HistoryView history={[...history].reverse()} />}
        </div>
      </div>
    </div>
  );
}

export default App;
