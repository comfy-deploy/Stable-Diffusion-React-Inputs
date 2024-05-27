import React from "react";
import { Label } from "./ui/label";
import { Input, InputProps } from "./ui/input";

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
