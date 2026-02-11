import AppBar from "@/components/AppBar";
import VelasCard from "@/components/VelasCard";
import SignalCard from "@/components/SignalCard";
import GameIframe from "@/components/GameIframe";
import PromoModal from "@/components/PromoModal";
import Footer from "@/components/Footer";
import { useVelas } from "@/hooks/useVelas";
import { useNotifications } from "@/hooks/useNotifications";
import { usePrediction } from "@/hooks/usePrediction";

const Index = () => {
  const { latestVelas, ultimaVela, lastTimestamp, allRecords } = useVelas();
  useNotifications();

  const prediction = usePrediction(allRecords, ultimaVela, lastTimestamp);
  const displayVelas = latestVelas.length > 0 ? latestVelas : [1.23, 3.45, 1.87, 12.5];

  return (
    <div className="min-h-screen pb-16 select-none">
      <AppBar onlineCount={42} isConnected={true} />

      <main className="p-4 flex flex-col gap-4 max-w-[900px] mx-auto">
        <VelasCard velas={displayVelas} />
        <SignalCard
          aposde={prediction.aposde}
          cashout={prediction.cashout}
          maxGales={prediction.maxGales}
          placar={prediction.placar}
          placarStatus={prediction.status}
        />
        <GameIframe />
      </main>

      <Footer />
      <PromoModal />
    </div>
  );
};

export default Index;
