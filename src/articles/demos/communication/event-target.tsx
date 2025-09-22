"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/button";

const eventBus = new EventTarget();

export const ComponentA = () => {
  const handleClick = () => {
    eventBus.dispatchEvent(
      new CustomEvent("custom-message", {
        detail: { message: "Hello Bro" },
      }),
    );
  };

  return (
    <Button kind="primary" onClick={handleClick}>
      Send Message
    </Button>
  );
};

export const ComponentB = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMsg(customEvent.detail.message);
    };
    eventBus.addEventListener("custom-message", handler);

    return () => {
      eventBus.removeEventListener("custom-message", handler);
    };
  }, []);

  return <div>收到消息：{msg}</div>;
};

export const EventTargetDemo = () => {
  return (
    <div className="flex items-center gap-4">
      <ComponentA />
      <ComponentB />
    </div>
  );
};
