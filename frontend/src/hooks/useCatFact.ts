import { useState } from "react";
import { getFact } from "../api/fact";
import type { CatFact } from "../api/types";

export function useCatFact(
  onError: (message: string) => void,
  onNewFact?: () => void,
) {
  const [text, setText] = useState<CatFact>({ fact: "", length: 0 });
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    getFact()
      .then((data) => {
        setText(data);
        onNewFact?.();
        onError("");
      })
      .catch(() => onError("Failed to fetch a fact. Please try again."))
      .finally(() => setLoading(false));
  };

  return { text, loading, handleFetch };
}
