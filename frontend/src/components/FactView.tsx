import type { CatFact } from "../api/types";

interface Props {
  fact: CatFact;
}

export function FactView({ fact }: Props) {
  return (
    <>
      <div className="h-40 overflow-y-auto flex items-center">
        {fact.fact ? (
          <p className="text-slate-700 leading-relaxed">{fact.fact}</p>
        ) : (
          <p className="text-slate-400 italic">
            Click the button to fetch your first fact.
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between h-5">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Length
        </span>
        <span className="text-sm font-medium text-slate-600">
          {fact.fact ? `${fact.length} characters` : "—"}
        </span>
      </div>
    </>
  );
}
