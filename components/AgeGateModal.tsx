"use client";

import { useState } from "react";
import { setAgeVerified } from "@/lib/age";

export function AgeGateModal({ onVerify }: { onVerify: () => void }) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (!checked) {
      setError("You must confirm you are 18 or older to continue.");
      return;
    }
    setAgeVerified(true);
    onVerify();
  };

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-modal" role="dialog" aria-modal="true" aria-label="Age verification">
        <p className="age-gate-title">Age verification</p>
        <p className="age-gate-text">
          This website contains AI-generated tattoo content intended for adults.
          You must be 18 years or older to use this tool.
        </p>
        <label className="age-gate-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              setError(null);
            }}
          />
          <span>I confirm that I am 18 years of age or older.</span>
        </label>
        {error && <p className="age-gate-error">{error}</p>}
        <button type="button" className="btn btn-primary" onClick={handleContinue}>
          I am 18+
        </button>
      </div>
    </div>
  );
}
