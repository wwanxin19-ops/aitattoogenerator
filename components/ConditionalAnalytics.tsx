"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getStoredConsent } from "@/lib/consent";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || "G-LJVWME0T3W";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_ID || "x5sdfbg8kx";

export function ConditionalAnalytics() {
  const [mounted, setMounted] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAllowAnalytics(getStoredConsent() === "accepted");

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setAllowAnalytics(detail === "accepted");
    };

    window.addEventListener("cookieConsentChange", onChange);
    return () => window.removeEventListener("cookieConsentChange", onChange);
  }, []);

  if (!mounted || !allowAnalytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}', { page_path: window.location.pathname });
        `}
      </Script>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `}
      </Script>
    </>
  );
}
