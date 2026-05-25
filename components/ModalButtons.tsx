"use client";

import { useState } from "react";
import { EmailModal } from "./EmailModal";

type ModalType = "pro" | "studio";

type ModalButtonProps = {
  type: ModalType;
  children: string;
  block?: boolean;
};

export function ModalButton({ type, children, block }: ModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={`btn btn-primary${block ? " btn-block" : ""}`} type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
      {open ? <EmailModal type={type} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
