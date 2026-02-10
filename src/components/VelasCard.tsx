interface VelasCardProps {
  velas: number[];
}

const VelasCard = ({ velas }: VelasCardProps) => {
  const getVelaTextColor = (value: number) => {
    if (value < 2) return "text-[hsl(217,91%,68%)]";
    if (value < 10) return "text-[hsl(270,70%,65%)]";
    return "text-[hsl(330,80%,65%)]";
  };

  const parsed = velas.slice(0, 4).map((v) => Number(v));

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
        {parsed.map((v, i) => {
          const textColor = getVelaTextColor(v);
          return (
            <li
              key={i}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border border-border bg-[hsl(220,20%,10%)] ${textColor}`}
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
