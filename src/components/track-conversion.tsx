"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

export function TrackConversion({ event, params }: { event: string; params?: AnalyticsParams }) {
  useEffect(() => {
    trackEvent(event, params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
