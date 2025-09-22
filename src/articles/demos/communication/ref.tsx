"use client";

import { useImperativeHandle, useRef } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export type ChildRef = {
  focusInput: () => void;
};

export const RefDemo = () => {
  const childRef = useRef<ChildRef>(null);

  const handleFocus = () => {
    childRef.current?.focusInput();
  };

  return (
    <div className="flex gap-4">
      <div>
        <div className="text-h4 font-semibold text-text-primary">Parent</div>
        <Button kind="primary" onClick={handleFocus}>
          Focus on Child
        </Button>
      </div>
      <Child ref={childRef} />
    </div>
  );
};

const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus();
    },
  }));

  return (
    <div>
      <div className="text-h4 font-semibold text-text-primary">Child</div>
      <Input ref={inputRef} id="child" placeholder="Search..." />
    </div>
  );
};
