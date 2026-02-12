const GameIframe = () => {
  return (
    <div className="w-full h-[800px] mt-4 rounded-lg overflow-hidden border border-foreground/5 shadow-md">
      <iframe
        src="https://lotto24.co.mz/en?type=signup&btag=txkpeqevtnzifeaxaiujrrodef&affid=526103"
        className="w-full h-full border-none"
        title="TxunaPlay"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; payment; camera; microphone"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        loading="eager"
      />
    </div>
  );
};

export default GameIframe;
