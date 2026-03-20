"use client";

import { GlobalAudioProvider } from "./global-audio-provider";
import { ScrollManager } from "./scroll-manager";
import { AnalyticsTracker } from "./analytics-tracker";
import { AssistantWidget } from "./assistant-widget";
import { AuthRecoveryListener } from "./auth-recovery-listener";
type Props = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: Props) {
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
