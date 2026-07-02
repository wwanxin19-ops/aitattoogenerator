"use client";

import { useEffect, useState } from "react";
import { isAgeVerified } from "@/lib/age";
import { AgeGateModal } from "./AgeGateModal";

export function AgeGateWrapper({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    setVerified(isAgeVerified());
  }, []);

  if (verified === null) return null;

  if (!verified) {
    return <AgeGateModal onVerify={() => setVerified(true)} />;
  }

  return <>{children}</>;
}
