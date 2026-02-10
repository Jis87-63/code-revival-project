import { useState } from "react";

export interface HistoryItem {
  ts: string;
  status: "green" | "loss";
  aposde: string;
  cashout: string;
  velaFinal: string;
}

interface HistoryListProps {
  items: HistoryItem[];
}

const HistoryList = ({ items }: HistoryListProps) => {
  const [filter, setFilter] = useState<"all" | "green" | "loss">("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-foreground">Histórico</h2>
        <div className="flex gap-2">
          {(["all", "green", "loss"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-foreground border-border hover:bg-accent"
              }`}
            >
              {f === "all" ? "Todos" : f === "green" ? "Green" : "Loss"}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {filtered.map((item, i) => (
          <li
            key={i}
            className="bg-card-inner border border-border rounded-lg p-3.5 flex justify-between items-center"
          >
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">{item.ts}</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full bg-secondary">
                  Apos: {item.aposde}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-secondary">
                  Cash: {item.cashout}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-secondary">
                  Vela: {item.velaFinal}
                </span>
              </div>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                item.status === "green"
                  ? "bg-primary/20 text-primary"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {item.status.toUpperCase()}
            </span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-center text-sm text-muted-foreground py-4">
            Nenhum resultado ainda
          </li>
        )}
      </ul>
    </div>
  );
};

export default HistoryList;
