import { useMemo } from "react";
import { useVelas } from "@/hooks/useVelas";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/icon-192.png";

const Monitor = () => {
  const { allRecords } = useVelas();
  const navigate = useNavigate();

  const parseTs = (t: number | string) => typeof t === "string" ? new Date(t).getTime() : t;
  const parseVela = (v: number | string) => {
    const n = typeof v === "string" ? parseFloat(v.toString().replace("x", "")) : Number(v);
    return isNaN(n) ? 0 : n;
  };

  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();

    const todayRecords = allRecords.filter((r) => parseTs(r.timestamp) >= todayMs);
    const totalVelas = todayRecords.reduce((acc, r) => acc + (r.totalVelas || 0), 0);

    let greens = 0;
    let losses = 0;
    todayRecords.forEach((r) => {
      (r.velas || []).forEach((v) => {
        if (parseVela(v) >= 2) greens++;
        else losses++;
      });
    });

    return { totalVelas, greens, losses, totalRecords: todayRecords.length };
  }, [allRecords]);

  return (
    <div className="min-h-screen bg-background text-foreground select-none">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-3 py-2.5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-base font-bold text-foreground">Monitor</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/docs")}
            className="px-3 py-1.5 rounded-full text-sm font-semibold border border-border text-info bg-background hover:bg-card transition-colors"
          >
            📄 Docs
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1.5 rounded-full text-sm font-semibold border border-border text-primary bg-background hover:bg-card transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </header>

      <main className="p-4 max-w-[900px] mx-auto flex flex-col gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-lg font-bold mb-4 text-foreground">📊 Estatísticas de Hoje</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Total Velas" value={todayStats.totalVelas} />
            <StatBox label="Envios" value={todayStats.totalRecords} />
            <StatBox label="Greens (≥2x)" value={todayStats.greens} color="text-primary" />
            <StatBox label="Losses (<2x)" value={todayStats.losses} color="text-destructive" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-lg font-bold mb-4 text-foreground">📜 Últimos Envios</h2>
          <ul className="flex flex-col gap-2">
            {allRecords.slice(0, 10).map((r, i) => (
              <li key={i} className="bg-card-inner border border-border rounded-lg p-3 text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground text-xs">
                    {new Date(parseTs(r.timestamp)).toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs text-info font-bold">{r.totalVelas} velas</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(r.velas || []).slice(0, 6).map((v, j) => {
                    const num = parseVela(v);
                    return (
                      <span
                        key={j}
                        className={`text-xs px-2 py-0.5 rounded-md font-bold bg-[hsl(220,20%,10%)] ${
                          num < 2
                            ? "text-[hsl(217,91%,68%)]"
                            : num < 10
                            ? "text-[hsl(270,70%,65%)]"
                            : "text-[hsl(330,80%,65%)]"
                        }`}
                      >
                        {num.toFixed(2)}x
                      </span>
                    );
                  })}
                  {(r.velas || []).length > 6 && (
                    <span className="text-xs text-muted-foreground">+{r.velas.length - 6}</span>
                  )}
                </div>
              </li>
            ))}
            {allRecords.length === 0 && (
              <li className="text-center text-sm text-muted-foreground py-4">
                Nenhum dado disponível
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

const StatBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) => (
  <div className="bg-card-inner border border-border rounded-xl p-3 flex flex-col items-center">
    <span className="text-[10px] font-medium text-muted-foreground mb-1">{label}</span>
    <span className={`text-2xl font-bold ${color || "text-foreground"}`}>{value}</span>
  </div>
);

export default Monitor;
