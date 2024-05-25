"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type SDTextareaProps = InputProps & {
  label?: string;
  inputClasses?: string;
};

export const SDInput = React.forwardRef<HTMLInputElement, SDTextareaProps>(
  ({ label, className, inputClasses, ...props }, ref) => {
    return (
      <div className={className}>
        {label && <Label htmlFor={label}>{label}</Label>}
        <Input ref={ref} className={inputClasses} {...props} id={label} />
      </div>
    );
  },
);
