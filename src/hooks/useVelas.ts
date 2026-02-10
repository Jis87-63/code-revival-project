import { useEffect, useState } from "react";
import { db, ref, onValue } from "@/lib/firebase";

export interface VelaRecord {
  timestamp: number | string;
  ultimaVela: number | string;
  maiorVela: number;
  totalVelas: number;
  velas: (number | string)[];
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
      records.sort((a, b) => {
        const tsA = typeof a.timestamp === "string" ? new Date(a.timestamp).getTime() : a.timestamp;
        const tsB = typeof b.timestamp === "string" ? new Date(b.timestamp).getTime() : b.timestamp;
        return tsB - tsA;
      });

      setAllRecords(records);

      if (records.length > 0) {
        const latest = records[0];
        // ultimaVela can be "1.73x" string or number
        const uv = typeof latest.ultimaVela === "string"
          ? parseFloat(latest.ultimaVela.replace("x", ""))
          : Number(latest.ultimaVela);
        setUltimaVela(isNaN(uv) ? null : uv);
        // timestamp can be ISO string or number
        const ts = typeof latest.timestamp === "string"
          ? new Date(latest.timestamp).getTime()
          : latest.timestamp;
        setLastTimestamp(ts);
        // Get last 4 velas, parsing string values
        const velas4 = (latest.velas || []).slice(0, 4).map((v: any) => {
          const n = typeof v === "string" ? parseFloat(v.toString().replace("x", "")) : Number(v);
          return isNaN(n) ? 0 : n;
        });
        setLatestVelas(velas4);
      }
    });

    return () => unsub();
  }, []);

  return { latestVelas, ultimaVela, lastTimestamp, allRecords };
};
