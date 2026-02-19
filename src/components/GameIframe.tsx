const GameIframe = () => {
  return (
    <div className="w-full h-[800px] mt-4 rounded-lg overflow-hidden border border-foreground/5 shadow-md">
      <iframe
        src="https://go.aff.oddsbest.co/uvvguo18"
        className="w-full h-full border-none"
        title="Lotto24"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; payment; camera; microphone"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        loading="eager"
      />
    </div>
  );
};

export default GameIframe;
