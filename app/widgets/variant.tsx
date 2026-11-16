"use client";

import Script from "next/script";
import { useEffect } from "react";

export function VariantAR() {
  useEffect(() => {
    navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["local", "anchors", "dom-overlay", "hit-test"],
    });
  }, []);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://launchar.app/sdk/v1?key=aXQrz4YNOJ88XRzzziGzG1ckxH6qXVNQ&redirect=true"
      />
    </>
  );
}
