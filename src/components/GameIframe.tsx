const GameIframe = () => {
  return (
    <div className="w-full h-[800px] mt-4 rounded-lg overflow-hidden border border-foreground/5 shadow-md">
      <iframe
        src="https://go.aff.oddsbest.co/uvvguo18"
        className="w-full h-full border-none"
        title="TxunaPlay"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; payment; camera; microphone"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox allow-modals allow-downloads"
        referrerPolicy="no-referrer-when-downgrade"
        loading="eager"
      />
    </div>
  );
};

export default GameIframe;
