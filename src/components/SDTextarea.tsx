"use client";
import { EditAttention } from "@/components/SDInputs/editAttention";
import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import React, { useEffect } from "react";

type SDTextareaProps = TextareaProps & {
  label?: string;
  textareaClasses?: string;
};

export const SDTextarea = React.forwardRef<
  HTMLTextAreaElement,
  SDTextareaProps
>(({ label, textareaClasses, className, ...props }, ref) => {
  useEffect(() => {
    window.addEventListener("keydown", EditAttention);
    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", EditAttention);
    };
  }, []);
  return (
    <div className={className}>
      {label && <Label htmlFor={label}>{label}</Label>}
      <Textarea ref={ref} className={textareaClasses} {...props} id={label} />
    </div>
  );
});
