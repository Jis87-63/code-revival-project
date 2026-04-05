const GameIframe = () => {
  return (
    <div className="w-full h-[800px] mt-4 rounded-lg overflow-hidden border border-foreground/5 shadow-md">
      <iframe
        src="https://www.megagamelive.com/affiliates/?btag=2084979"
        className="w-full h-full border-none"
        title="Megagamelive"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; payment; camera; microphone"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        loading="eager"
      />
    </div>
  );
};

export default GameIframe;
