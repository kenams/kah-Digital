"use client";

import { GlobalAudioProvider } from "./global-audio-provider";
import { ScrollManager } from "./scroll-manager";
import { AnalyticsTracker } from "./analytics-tracker";
import { AssistantWidget } from "./assistant-widget";
type Props = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: Props) {
  return (
    <GlobalAudioProvider>
      <ScrollManager />
      <AnalyticsTracker />
      {children}
      <AssistantWidget />
    </GlobalAudioProvider>
  );
}
