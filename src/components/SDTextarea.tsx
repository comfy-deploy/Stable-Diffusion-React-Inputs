import React, { useEffect } from "react";
import { Textarea, TextareaProps } from "./ui/textarea";
import { EditAttention } from "./editAttention";
import { Label } from "./ui/label";

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
