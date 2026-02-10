interface VelasCardProps {
  velas: number[];
}

const VelasCard = ({ velas }: VelasCardProps) => {
  const getVelaColors = (value: number) => {
    if (value < 2) return { bg: "bg-[hsl(0,40%,12%)]", text: "text-[hsl(0,100%,68%)]" };
    return { bg: "bg-[hsl(150,40%,10%)]", text: "text-primary" };
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-base font-semibold mb-3">
        <span className="flex items-center gap-2 text-info">
          <span className="w-2 h-2 bg-info rounded-full animate-ping-dot" />
          <span>Analisando velas</span>
          <span className="inline-flex gap-1">
            <i className="inline-block w-1 h-1 bg-current rounded-full animate-bounce-dot dot-delay-1" />
            <i className="inline-block w-1 h-1 bg-current rounded-full animate-bounce-dot dot-delay-2" />
            <i className="inline-block w-1 h-1 bg-current rounded-full animate-bounce-dot" />
          </span>
        </span>
      </h3>
      <ul className="flex gap-2 flex-wrap list-none">
        {velas.map((v, i) => {
          const colors = getVelaColors(v);
          return (
            <li
              key={i}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border border-border ${colors.bg} ${colors.text}`}
            >
              {v.toFixed(2)}x
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VelasCard;
