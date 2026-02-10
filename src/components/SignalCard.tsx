interface SignalCardProps {
  aposde: string;
  cashout: string;
  maxGales: string;
  placar: string;
  placarStatus: "green" | "loss" | "waiting";
}

const SignalCard = ({ aposde, cashout, maxGales, placar, placarStatus }: SignalCardProps) => {
  const placarClasses =
    placarStatus === "green"
      ? "bg-primary/20 text-primary"
      : placarStatus === "loss"
      ? "bg-destructive/20 text-destructive"
      : "bg-secondary border border-border/50 text-foreground";

  return (
    <section className="bg-card border-2 border-primary rounded-2xl p-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-foreground">Entrada confirmada</h2>
        <span className={`text-[11px] px-3 py-1 font-bold rounded-full ${placarClasses}`}>
          {placar}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <MetricBox label="Depois de" value={aposde} />
        <MetricBox label="Tirar no:" value={cashout} />
        <MetricBox label="Tentativas" value={maxGales} />
      </div>
    </section>
  );
};

const MetricBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-foreground/5 border border-foreground/5 rounded-xl p-2 flex flex-col items-center justify-center text-center">
    <span className="text-[10px] font-medium text-muted-foreground mb-0.5">{label}</span>
    <span className="text-lg font-bold text-foreground">{value}</span>
  </div>
);

export default SignalCard;
