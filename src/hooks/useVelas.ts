import { useEffect, useState } from "react";
import { db, ref, onValue } from "@/lib/firebase";

export interface VelaRecord {
  timestamp: number;
  ultimaVela: number;
  maiorVela: number;
  totalVelas: number;
  velas: number[];
}

export const useVelas = () => {
  const [latestVelas, setLatestVelas] = useState<number[]>([]);
  const [ultimaVela, setUltimaVela] = useState<number | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
  const [allRecords, setAllRecords] = useState<VelaRecord[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "historico-velas");
    const unsub = onValue(dbRef, (snapshot) => {
      const dados = snapshot.val();
      if (!dados) return;

      const records: VelaRecord[] = Object.values(dados);
      records.sort((a, b) => b.timestamp - a.timestamp);

      setAllRecords(records);

      if (records.length > 0) {
        const latest = records[0];
        setUltimaVela(latest.ultimaVela);
        setLastTimestamp(latest.timestamp);
        // Get last 4 velas from the most recent record
        const velas4 = latest.velas.slice(0, 4);
        setLatestVelas(velas4);
      }
    });

    return () => unsub();
  }, []);

  return { latestVelas, ultimaVela, lastTimestamp, allRecords };
};
