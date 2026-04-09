"use client";

import { useEffect, useState } from "react";

function isIOSDevice(userAgent: string) {
  return /iPad|iPhone|iPod/.test(userAgent);
}

export default function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isIOS = isIOSDevice(userAgent);
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        // Safari iOS fallback
        (window.navigator as Navigator & { standalone?: boolean })
          .standalone === true;

      setShowPrompt(isIOS && !isStandalone);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="mx-auto mb-4 max-w-7xl px-4 pt-4 sm:px-6 lg:px-10">
      <div className="rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
        <p className="font-medium">Install TripFly on your iPhone</p>
        <p className="mt-1 text-cyan-100/90">
          In Safari, tap <span aria-hidden>􀈂</span> <strong>Share</strong> and
          choose <strong>Add to Home Screen</strong> for the full-screen app
          experience.
        </p>
      </div>
    </div>
  );
}
