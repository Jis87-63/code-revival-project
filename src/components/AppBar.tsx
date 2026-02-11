import logoImg from "@/assets/icon-192.png";

interface AppBarProps {
  onlineCount: number;
  isConnected: boolean;
  isSystemActive?: boolean;
}

const AppBar = ({ onlineCount, isConnected, isSystemActive = true }: AppBarProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border px-3 py-2.5 flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-foreground leading-tight">Sistema Cashout</h1>
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isSystemActive ? "bg-primary animate-ping-dot" : "bg-muted-foreground"
              }`}
              title={isSystemActive ? "Sistema ativo" : "Sistema inativo"}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">
            {isSystemActive ? "Aguarde entrada" : "Inativo"}
          </span>
        </div>
      </div>
      <div
        className={`px-3 py-1.5 rounded-full text-sm font-semibold border border-border ${
          isConnected ? "text-primary" : "text-warning"
        } bg-background`}
      >
        {isConnected ? `• ${onlineCount} online` : "• Reconectando …"}
      </div>
    </header>
  );
};

export default AppBar;
