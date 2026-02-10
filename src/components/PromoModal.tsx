import { useEffect, useState } from "react";

type ModalType = "aviso" | "whatsapp" | "premium" | null;

const PromoModal = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    const timer = setTimeout(() => setActiveModal("whatsapp"), 10000);
    return () => clearTimeout(timer);
  }, []);

  const close = (next: ModalType, delayMs: number) => {
    setActiveModal(null);
    const timer = setTimeout(() => setActiveModal(next), delayMs);
    return () => clearTimeout(timer);
  };

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
      {activeModal === "aviso" && (
        <ModalBox borderColor="border-primary">
          <CloseBtn onClick={() => close("premium", 40000)} />
          <h2 className="text-primary text-center text-xl font-bold uppercase tracking-wide mb-4">
            ⚠️ AVISO IMPORTANTE
          </h2>
          <p className="text-muted-foreground text-center text-[15px] leading-relaxed mb-6">
            Para usar o sistema corretamente, é necessário estar conectado à casa de apostas onde o
            sistema funciona. Caso ainda não possua uma conta, crie a sua através do botão abaixo.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => close("premium", 40000)}
              className="flex-1 bg-secondary text-foreground rounded-lg py-3.5 font-semibold uppercase text-sm hover:bg-accent transition-colors"
            >
              FECHAR
            </button>
            <button
              onClick={() => {
                close("premium", 40000);
                window.open("https://txunaplay.com/te44bfd5e", "_blank");
              }}
              className="flex-1 bg-primary text-primary-foreground rounded-lg py-3.5 font-semibold uppercase text-sm hover:brightness-110 transition-all"
            >
              CRIAR CONTA
            </button>
          </div>
        </ModalBox>
      )}

      {activeModal === "whatsapp" && (
        <ModalBox borderColor="border-warning">
          <CloseBtn onClick={() => close("aviso", 40000)} />
          <h2 className="text-primary text-center text-xl font-bold uppercase tracking-wide mb-5">
            GRUPO OFICIAL WHATSAPP
          </h2>
          <p className="text-foreground text-center text-[15px] leading-relaxed mb-4 font-medium">
            Entre agora no grupo de WhatsApp e tenha acesso a dicas exclusivas, outros bots 100%
            assertivos e suporte 24/24.
          </p>
          <p className="text-muted-foreground text-center text-[15px] leading-relaxed mb-6">
            No grupo você encontra tudo o que precisa para ganhar no Aviator todos os dias com
            segurança.
          </p>
          <button
            onClick={() => {
              close("aviso", 40000);
              window.open("https://chat.whatsapp.com/KTUchKsM5IWFW69ttbu2RK?mode=gi_t", "_blank");
            }}
            className="w-full bg-primary text-primary-foreground rounded-lg py-4 font-bold uppercase text-[15px] tracking-wide shadow-[0_0_15px_hsl(var(--primary)/0.4)] animate-heartbeat hover:brightness-110 transition-all"
          >
            ENTRAR NO GRUPO AGORA
          </button>
        </ModalBox>
      )}

      {activeModal === "premium" && (
        <ModalBox borderColor="border-destructive">
          <CloseBtn onClick={() => close("whatsapp", 180000)} />
          <h2 className="text-primary text-center text-xl font-bold uppercase tracking-wide mb-5">
            BOT AVIATOR 100% ACERTO*
          </h2>
          <p className="text-foreground text-center text-[15px] leading-relaxed mb-4">
            Pare de usar a versão gratuita e ative agora a versão paga do Bot Aviator.
          </p>
          <p className="text-foreground text-center text-[15px] leading-relaxed mb-4">
            Com a versão premium, você terá acesso aos sinais com 100% de acerto.
          </p>
          <p className="text-foreground text-center text-[15px] leading-relaxed mb-6">
            Garanta já a sua vantagem exclusiva por{" "}
            <span className="inline-block bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-bold">
              450 MT
            </span>{" "}
            e comece a faturar.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => close("whatsapp", 180000)}
              className="flex-1 bg-secondary text-foreground rounded-lg py-3.5 font-semibold uppercase text-sm hover:bg-accent transition-colors"
            >
              DEPOIS
            </button>
            <button
              onClick={() => {
                close("whatsapp", 180000);
                const msg = encodeURIComponent("Gostaria de obter a versão paga do Bot 100%");
                window.open(`https://wa.me/258871009140?text=${msg}`, "_blank");
              }}
              className="flex-1 bg-destructive text-destructive-foreground rounded-lg py-3.5 font-semibold uppercase text-sm hover:brightness-110 transition-all"
            >
              VER AGORA
            </button>
          </div>
        </ModalBox>
      )}
    </div>
  );
};

const ModalBox = ({
  children,
  borderColor,
}: {
  children: React.ReactNode;
  borderColor: string;
}) => (
  <div
    className={`bg-gradient-to-br from-card to-background border-[3px] ${borderColor} rounded-2xl p-7 max-w-[400px] w-full relative`}
  >
    {children}
  </div>
);

const CloseBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-3 right-3 text-muted-foreground text-2xl hover:text-foreground transition-colors leading-none px-1"
  >
    ×
  </button>
);

export default PromoModal;
