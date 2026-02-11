import { useMemo } from "react";
import { type VelaRecord } from "@/hooks/useVelas";

export interface Prediction {
  aposde: string;      // predicted entry point e.g. "1.50x"
  cashout: string;     // predicted cashout e.g. "2.00x"
  maxGales: string;    // max retries
  status: "green" | "loss" | "waiting";
  placar: string;      // e.g. "GREEN 3.45x" or "--"
}

const parseVela = (v: number | string): number => {
  const n = typeof v === "string" ? parseFloat(v.toString().replace("x", "")) : Number(v);
  return isNaN(n) ? 0 : n;
};

/**
 * Prediction algorithm based on recent vela patterns.
 * Analyses the last N velas to find trends and predict optimal entry/cashout points.
 */
export const usePrediction = (allRecords: VelaRecord[], ultimaVela: number | null): Prediction => {
  return useMemo(() => {
    if (allRecords.length === 0 || ultimaVela === null) {
      return {
        aposde: "--",
        cashout: "--",
        maxGales: "--",
        status: "waiting",
        placar: "--",
      };
    }

    // Gather last 20 velas from recent records
    const recentVelas: number[] = [];
    for (const record of allRecords) {
      for (const v of record.velas || []) {
        recentVelas.push(parseVela(v));
        if (recentVelas.length >= 20) break;
      }
      if (recentVelas.length >= 20) break;
    }

    if (recentVelas.length < 3) {
      return {
        aposde: "--",
        cashout: "--",
        maxGales: "--",
        status: "waiting",
        placar: "--",
      };
    }

    // Algorithm: analyze patterns
    const avg = recentVelas.reduce((a, b) => a + b, 0) / recentVelas.length;
    const lowVelas = recentVelas.filter(v => v < 2).length;
    const highVelas = recentVelas.filter(v => v >= 2).length;
    const highRatio = highVelas / recentVelas.length;

    // Count consecutive lows (velas < 2x) at the start (most recent)
    let consecutiveLows = 0;
    for (const v of recentVelas) {
      if (v < 2) consecutiveLows++;
      else break;
    }

    // Predict entry point: after several low velas, the next is likely higher
    // Use the average of the last 3 low velas as entry reference
    const lastLows = recentVelas.filter(v => v < 2).slice(0, 3);
    const entryBase = lastLows.length > 0
      ? lastLows.reduce((a, b) => a + b, 0) / lastLows.length
      : 1.5;

    // Entry point: slightly above the average low
    const entryPoint = Math.max(1.10, Math.min(entryBase * 0.9, 2.0));

    // Cashout prediction: based on trend
    // If many recent highs, be conservative. If many lows (due for a high), aim higher.
    let cashoutTarget: number;
    if (consecutiveLows >= 3) {
      // After many lows, expect a higher vela - aim for bigger cashout
      cashoutTarget = Math.min(avg * 1.3, 5.0);
    } else if (highRatio > 0.5) {
      // Good streak, be conservative
      cashoutTarget = Math.max(2.0, avg * 0.8);
    } else {
      cashoutTarget = Math.max(2.0, avg);
    }
    cashoutTarget = Math.max(2.0, cashoutTarget);

    // Max gales based on volatility
    const volatility = Math.sqrt(
      recentVelas.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / recentVelas.length
    );
    const maxGales = volatility > 3 ? 3 : 2;

    // Determine result: check if latest vela hit the cashout target
    const latestVela = ultimaVela;
    let status: "green" | "loss" | "waiting";
    let placar: string;

    if (latestVela >= cashoutTarget) {
      status = "green";
      placar = `GREEN ${latestVela.toFixed(2)}x`;
    } else if (latestVela < entryPoint) {
      status = "loss";
      placar = `LOSS ${latestVela.toFixed(2)}x`;
    } else {
      status = "waiting";
      placar = `ANALISANDO...`;
    }

    return {
      aposde: `${entryPoint.toFixed(2)}x`,
      cashout: `${cashoutTarget.toFixed(2)}x`,
      maxGales: String(maxGales),
      status,
      placar,
    };
  }, [allRecords, ultimaVela]);
};
