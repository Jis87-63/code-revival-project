const GAME_URL = "https://go.aff.oddsbest.co/uvvguo18";

const GameIframe = () => {
  return (
    <div className="w-full mt-4 flex flex-col gap-3">
      {/* Botão de acesso direto */}
      <a
        href={GAME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-primary text-primary-foreground rounded-xl py-4 font-bold uppercase text-center text-[15px] tracking-wide shadow-[0_0_20px_hsl(var(--primary)/0.35)] hover:brightness-110 transition-all block animate-heartbeat"
      >
        🎮 JOGAR AVIATOR AGORA
      </a>

      {/* Iframe como fallback — alguns navegadores/dispositivos podem bloquear */}
      <div className="w-full h-[700px] rounded-lg overflow-hidden border border-foreground/5 shadow-md">
        <iframe
          src={GAME_URL}
          className="w-full h-full border-none"
          title="Aviator Game"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default GameIframe;
