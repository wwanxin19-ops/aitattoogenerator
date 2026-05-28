"use client";

import { useState } from "react";
import { EmailModal } from "./EmailModal";

type ModalType = "pro" | "studio";

type ModalButtonProps = {
  type: ModalType;
  children: string;
  block?: boolean;
  section?: string;
};

function trackCtaClick(type: ModalType, ctaText: string, section: string) {
  return fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: "cta_click",
      source: type,
      page: window.location.pathname,
      metadata: {
        cta_text: ctaText,
        section
      }
    })
  }).catch(() => undefined);
}

export function ModalButton({ type, children, block, section = "pricing" }: ModalButtonProps) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
    void trackCtaClick(type, children, section);
  }

  return (
    <>
      <button className={`btn btn-primary${block ? " btn-block" : ""}`} type="button" onClick={handleClick}>
        {children}
      </button>
      {open ? <EmailModal type={type} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
