"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FormEvent, ReactNode } from "react";

type SDFormProps = {
  actionArea?: any;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  scrollAreaClassName?: string;
};

// To make the scrollArea work, the parent should be a display flex;
export const SDForm = React.forwardRef(
  ({ actionArea, onSubmit, children, scrollAreaClassName }: SDFormProps, ref) => {
    return (
      <form className="flex flex-col w-full gap-5" onSubmit={onSubmit}>
        <ScrollArea className={scrollAreaClassName || 'max-h-[400px]'}>
          <div className="flex flex-col w-full gap-5 px-3 pb-2">{children}</div>
        </ScrollArea>
        {actionArea}
      </form>
    );
  },
);
