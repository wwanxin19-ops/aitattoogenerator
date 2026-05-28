"use client";

import { useState } from "react";
import { EmailModal } from "./EmailModal";
import { trackCTAClick } from "@/lib/analytics";

type ModalType = "pro" | "studio";

type ModalButtonProps = {
  type: ModalType;
  children: string;
  block?: boolean;
  section?: string;
};

export function ModalButton({ type, children, block, section = "pricing" }: ModalButtonProps) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
    trackCTAClick(type === "pro" ? "waitlist_open" : "studio_open", section);
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
