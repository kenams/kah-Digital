"use client";

import { GlobalAudioProvider } from "./global-audio-provider";
import { ScrollManager } from "./scroll-manager";
type Props = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: Props) {
  return (
    <GlobalAudioProvider>
      <ScrollManager />
      {children}
    </GlobalAudioProvider>
  );
}
