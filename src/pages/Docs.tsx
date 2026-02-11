import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/icon-192.png";

const Docs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground select-none">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-3 py-2.5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-base font-bold text-foreground">API Docs</h1>
        </div>
        <button
          onClick={() => navigate("/monitor")}
          className="px-3 py-1.5 rounded-full text-sm font-semibold border border-border text-primary bg-background hover:bg-card transition-colors"
        >
          ← Voltar
        </button>
      </header>

      <main className="p-4 max-w-[900px] mx-auto flex flex-col gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-xl font-bold text-foreground mb-2">📡 API de Sinais - Aviator</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Receba sinais de entrada em tempo real via API REST. Ideal para integrar com bots, apps ou dashboards externos.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">🔗 Endpoint</h3>
          <div className="bg-card-inner border border-border rounded-lg p-3">
            <code className="text-sm text-primary font-mono break-all">
              GET /v1/velas/aviator
            </code>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">🔐 Autenticação</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Todas as requisições devem incluir uma chave de API válida no header.
          </p>
          <div className="bg-card-inner border border-border rounded-lg p-3 mb-3">
            <code className="text-sm text-info font-mono">
              x-api-key: SUA_API_KEY
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            Ou via header Authorization: <code className="text-info">Bearer SUA_API_KEY</code>
          </p>
          <p className="text-xs text-destructive mt-2 font-medium">
            ⚠️ Para obter sua API Key, entre em contacto com o administrador.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">📋 Exemplo de Requisição</h3>
          <div className="bg-card-inner border border-border rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs text-foreground font-mono whitespace-pre">{`curl -X GET \\
  "https://seu-dominio.com/v1/velas/aviator" \\
  -H "x-api-key: SUA_API_KEY"`}</pre>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">📦 Resposta</h3>
          <div className="bg-card-inner border border-border rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs text-foreground font-mono whitespace-pre">{`{
  "prediction": {
    "entrada_apos": "1.35x",
    "sacar_em": "2.50x",
    "tentativas": 2,
    "ultima_vela": "3.45x",
    "status": "green"
  },
  "signals": [
    {
      "timestamp": "2026-02-11T01:30:00Z",
      "ultimaVela": "3.45x",
      "totalVelas": 5,
      "velas": [1.23, 3.45, 1.87, 12.5, 1.02]
    }
  ],
  "total_records": 10,
  "updated_at": "2026-02-11T01:35:00Z"
}`}</pre>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">📊 Campos da Resposta</h3>
          <div className="flex flex-col gap-2">
            <FieldRow field="prediction.entrada_apos" desc="Valor mínimo para entrar na rodada" />
            <FieldRow field="prediction.sacar_em" desc="Valor recomendado para sacar" />
            <FieldRow field="prediction.tentativas" desc="Número máximo de tentativas (gales)" />
            <FieldRow field="prediction.status" desc="'green' = acerto, 'loss' = perda, 'waiting' = aguardando" />
            <FieldRow field="signals" desc="Últimos 5 registros de velas recebidos" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-bold text-foreground mb-3">⚠️ Códigos de Erro</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-card-inner border border-border rounded-lg p-3">
              <code className="text-sm text-destructive font-mono">401</code>
              <span className="text-xs text-muted-foreground">API Key inválida ou ausente</span>
            </div>
            <div className="flex justify-between items-center bg-card-inner border border-border rounded-lg p-3">
              <code className="text-sm text-destructive font-mono">500</code>
              <span className="text-xs text-muted-foreground">Erro interno do servidor</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FieldRow = ({ field, desc }: { field: string; desc: string }) => (
  <div className="bg-card-inner border border-border rounded-lg p-3 flex flex-col gap-1">
    <code className="text-xs text-primary font-mono">{field}</code>
    <span className="text-xs text-muted-foreground">{desc}</span>
  </div>
);

export default Docs;
