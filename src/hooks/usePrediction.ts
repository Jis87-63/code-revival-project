import { useMemo } from "react";
import { type VelaRecord } from "@/hooks/useVelas";

export interface Prediction {
  aposde: string;
  cashout: string;
  maxGales: string;
  status: "green" | "loss" | "waiting";
  placar: string;
}

const parseVela = (v: number | string): number => {
  const n = typeof v === "string" ? parseFloat(v.toString().replace("x", "")) : Number(v);
  return isNaN(n) ? 0 : n;
};

const INACTIVITY_THRESHOLD = 10 * 60 * 1000; // 10 minutes

export const usePrediction = (
  allRecords: VelaRecord[],
  ultimaVela: number | null,
  lastTimestamp: number | null
): Prediction => {
  return useMemo(() => {
    const inactive: Prediction = {
      aposde: "--",
      cashout: "--",
      maxGales: "--",
      status: "waiting",
      placar: "--",
    };

    if (allRecords.length === 0 || ultimaVela === null || lastTimestamp === null) {
      return inactive;
    }

    // If system inactive for 10+ minutes, don't predict
    const timeSinceLast = Date.now() - lastTimestamp;
    if (timeSinceLast >= INACTIVITY_THRESHOLD) {
      return inactive;
    }

    // "Após" = the most recent vela that just came in (ultimaVela)
    const aposde = `${ultimaVela.toFixed(2)}x`;

    // Gather last 20 velas for analysis
    const recentVelas: number[] = [];
    for (const record of allRecords) {
      for (const v of record.velas || []) {
        recentVelas.push(parseVela(v));
        if (recentVelas.length >= 20) break;
      }
      if (recentVelas.length >= 20) break;
    }

    if (recentVelas.length < 3) {
      return { ...inactive, aposde };
    }

    const avg = recentVelas.reduce((a, b) => a + b, 0) / recentVelas.length;
    const highRatio = recentVelas.filter(v => v >= 2).length / recentVelas.length;

    let consecutiveLows = 0;
    for (const v of recentVelas) {
      if (v < 2) consecutiveLows++;
      else break;
    }

    // Cashout prediction
    let cashoutTarget: number;
    if (consecutiveLows >= 3) {
      cashoutTarget = Math.min(avg * 1.3, 5.0);
    } else if (highRatio > 0.5) {
      cashoutTarget = Math.max(2.0, avg * 0.8);
    } else {
      cashoutTarget = Math.max(2.0, avg);
    }
    cashoutTarget = Math.max(2.0, cashoutTarget);

    const volatility = Math.sqrt(
      recentVelas.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / recentVelas.length
    );
    const maxGales = volatility > 3 ? 3 : 2;

    // Status: did the latest vela hit the cashout?
    let status: "green" | "loss" | "waiting";
    let placar: string;

    if (ultimaVela >= cashoutTarget) {
      status = "green";
      placar = `GREEN ${ultimaVela.toFixed(2)}x`;
    } else if (ultimaVela < 1.5) {
      status = "loss";
      placar = `LOSS ${ultimaVela.toFixed(2)}x`;
    } else {
      status = "waiting";
      placar = `ANALISANDO...`;
    }

    return {
      aposde,
      cashout: `${cashoutTarget.toFixed(2)}x`,
      maxGales: String(maxGales),
      status,
      placar,
    };
  }, [allRecords, ultimaVela, lastTimestamp]);
};
