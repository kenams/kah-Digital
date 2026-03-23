"use client";

import { useEffect } from "react";
import { GlobalAudioProvider } from "./global-audio-provider";
import { ScrollManager } from "./scroll-manager";
import { AnalyticsTracker } from "./analytics-tracker";
import { AssistantWidget } from "./assistant-widget";
import { AuthRecoveryListener } from "./auth-recovery-listener";
import { useLocale } from "@/lib/locale";

type Props = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: Props) {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <GlobalAudioProvider>
      <AuthRecoveryListener />
      <ScrollManager />
      <AnalyticsTracker />
      {children}
      <AssistantWidget />
    </GlobalAudioProvider>
  );
}
