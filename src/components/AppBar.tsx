import logoImg from "@/assets/icon-192.png";

interface AppBarProps {
  onlineCount: number;
  isConnected: boolean;
}

const AppBar = ({ onlineCount, isConnected }: AppBarProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border px-3 py-2.5 flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">Sistema Cashout</h1>
          <span className="text-[10px] text-muted-foreground">
            {isConnected ? "Aguarde entrada" : "Conectando …"}
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
