import { useEffect, useRef, useCallback } from "react";
import { useVelas } from "@/hooks/useVelas";

const INACTIVITY_THRESHOLD = 30 * 60 * 1000; // 30 minutes

export const useNotifications = () => {
  const { lastTimestamp, ultimaVela } = useVelas();
  const wasInactiveRef = useRef(false);
  const notifCountRef = useRef(0);
  const prevTimestampRef = useRef<number | null>(null);

  const requestPermission = useCallback(async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (!lastTimestamp) return;

    const now = Date.now();
    const timeSinceLastVela = now - lastTimestamp;

    // Check if system was inactive
    if (timeSinceLastVela > INACTIVITY_THRESHOLD) {
      wasInactiveRef.current = true;
      notifCountRef.current = 0;
      return;
    }

    // If system just came back from inactivity and we have a new timestamp
    if (wasInactiveRef.current && prevTimestampRef.current !== lastTimestamp) {
      wasInactiveRef.current = false;
      notifCountRef.current = 0;
    }

    // Send notification if we have a new vela and haven't exceeded limit
    if (prevTimestampRef.current !== null && prevTimestampRef.current !== lastTimestamp && notifCountRef.current < 3) {
      if ("Notification" in window && Notification.permission === "granted") {
        const notif = new Notification("SSCashout 🤖", {
          body: `ENTRADA CONFIRMADA✅✅✅\n\nAPÓS: ${ultimaVela?.toFixed(2)}x\nSACAR: 2.00x\n\n[SSCASHOUT🤖]`,
          icon: "/favicon.png",
          tag: `entry-${lastTimestamp}`,
        });

        notifCountRef.current += 1;

        // Auto close after 8s
        setTimeout(() => notif.close(), 8000);
      }
    }

    prevTimestampRef.current = lastTimestamp;
  }, [lastTimestamp, ultimaVela]);
};
