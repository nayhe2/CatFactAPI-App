import { useState } from "react";
import { getHistory } from "../api/fact";
import type { CatFact } from "../api/types";

export function useCatFactHistory(onError: (message: string) => void) {
  const [history, setHistory] = useState<CatFact[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleToggleHistory = () => {
    if (showHistory) {
      setShowHistory(false);
      return;
    }
    handleFetchHistory();
  };

  const handleFetchHistory = () => {
    setHistoryLoading(true);
    getHistory()
      .then((data) => {
        setHistory(data);
        setShowHistory(true);
      })
      .catch(() => onError("Failed to load history."))
      .finally(() => setHistoryLoading(false));
  };

  const refreshHistoryIfVisible = () => {
    if (showHistory) {
      handleFetchHistory();
    }
  };

  return {
    history,
    showHistory,
    historyLoading,
    handleToggleHistory,
    handleFetchHistory,
    refreshHistoryIfVisible,
  };
}
