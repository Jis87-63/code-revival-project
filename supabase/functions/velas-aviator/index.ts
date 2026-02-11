import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const API_KEY = "Milionario";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-api-key, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Auth check
  const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization")?.replace("Bearer ", "");
  if (apiKey !== API_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized. Invalid API key." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Fetch from Firebase
    const firebaseUrl = "https://bot-ia-20e75-default-rtdb.firebaseio.com/historico-velas.json?orderBy=%22timestamp%22&limitToLast=10";
    const fbRes = await fetch(firebaseUrl);
    const fbData = await fbRes.json();

    if (!fbData) {
      return new Response(JSON.stringify({ signals: [], message: "No data available" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parseVela = (v: string | number): number => {
      const n = typeof v === "string" ? parseFloat(v.toString().replace("x", "")) : Number(v);
      return isNaN(n) ? 0 : n;
    };

    const records = Object.values(fbData) as any[];
    records.sort((a: any, b: any) => {
      const tsA = typeof a.timestamp === "string" ? new Date(a.timestamp).getTime() : a.timestamp;
      const tsB = typeof b.timestamp === "string" ? new Date(b.timestamp).getTime() : b.timestamp;
      return tsB - tsA;
    });

    // Build prediction from recent data
    const recentVelas: number[] = [];
    for (const record of records) {
      for (const v of record.velas || []) {
        recentVelas.push(parseVela(v));
        if (recentVelas.length >= 20) break;
      }
      if (recentVelas.length >= 20) break;
    }

    let prediction = null;
    if (recentVelas.length >= 3) {
      const avg = recentVelas.reduce((a, b) => a + b, 0) / recentVelas.length;
      const lastLows = recentVelas.filter(v => v < 2).slice(0, 3);
      const entryBase = lastLows.length > 0 ? lastLows.reduce((a, b) => a + b, 0) / lastLows.length : 1.5;
      const entryPoint = Math.max(1.10, Math.min(entryBase * 0.9, 2.0));

      let consecutiveLows = 0;
      for (const v of recentVelas) {
        if (v < 2) consecutiveLows++;
        else break;
      }

      const highRatio = recentVelas.filter(v => v >= 2).length / recentVelas.length;
      let cashoutTarget: number;
      if (consecutiveLows >= 3) {
        cashoutTarget = Math.min(avg * 1.3, 5.0);
      } else if (highRatio > 0.5) {
        cashoutTarget = Math.max(2.0, avg * 0.8);
      } else {
        cashoutTarget = Math.max(2.0, avg);
      }
      cashoutTarget = Math.max(2.0, cashoutTarget);

      const ultimaVela = records.length > 0 ? parseVela(records[0].ultimaVela) : 0;
      const status = ultimaVela >= cashoutTarget ? "green" : ultimaVela < entryPoint ? "loss" : "waiting";

      prediction = {
        entrada_apos: `${entryPoint.toFixed(2)}x`,
        sacar_em: `${cashoutTarget.toFixed(2)}x`,
        tentativas: 2,
        ultima_vela: `${ultimaVela.toFixed(2)}x`,
        status,
      };
    }

    const signals = records.slice(0, 5).map((r: any) => ({
      timestamp: r.timestamp,
      ultimaVela: r.ultimaVela,
      totalVelas: r.totalVelas,
      velas: (r.velas || []).slice(0, 6).map((v: any) => parseVela(v)),
    }));

    return new Response(JSON.stringify({
      prediction,
      signals,
      total_records: records.length,
      updated_at: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
