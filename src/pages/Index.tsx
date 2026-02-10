import AppBar from "@/components/AppBar";
import VelasCard from "@/components/VelasCard";
import SignalCard from "@/components/SignalCard";
import GameIframe from "@/components/GameIframe";
import HistoryList, { type HistoryItem } from "@/components/HistoryList";
import PromoModal from "@/components/PromoModal";
import Footer from "@/components/Footer";

const mockVelas = [1.23, 3.45, 1.87, 12.5, 2.01];

const mockHistory: HistoryItem[] = [
  { ts: "14:32:10", status: "green", aposde: "1.50x", cashout: "2.00x", velaFinal: "3.45x" },
  { ts: "14:28:05", status: "loss", aposde: "1.30x", cashout: "1.80x", velaFinal: "1.12x" },
  { ts: "14:25:00", status: "green", aposde: "1.20x", cashout: "2.50x", velaFinal: "4.20x" },
];

const Index = () => {
  return (
    <div className="min-h-screen pb-16">
      <AppBar onlineCount={42} isConnected={true} />

      <main className="p-4 flex flex-col gap-4 max-w-[900px] mx-auto">
        <VelasCard velas={mockVelas} />
        <SignalCard
          aposde="1.50x"
          cashout="2.00x"
          maxGales="2"
          placar="GREEN 3.45x"
          placarStatus="green"
        />
        <GameIframe />
        <HistoryList items={mockHistory} />
      </main>

      <Footer />
      <PromoModal />
    </div>
  );
};

export default Index;
