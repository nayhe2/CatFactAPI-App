import type { CatFact } from "../api/types";

interface Props {
  history: CatFact[];
}

export function HistoryView({ history }: Props) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-100 max-h-48 overflow-y-auto">
      {history.length === 0 ? (
        <p className="text-sm text-slate-400 italic">No facts saved yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, i) => (
            <li
              key={i}
              className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0"
            >
              {item.fact}
              <span className="text-slate-400 ml-1">({item.length})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
