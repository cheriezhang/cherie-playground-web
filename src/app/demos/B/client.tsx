"use client";

import { use, useEffect, useState } from "react";

import type { TMode, TParams } from "../types";

export const Client = ({ params }: { params: Promise<TParams> }) => {
  const [message, setMessage] = useState<Record<TMode, string>>({
    url: "",
    localStorage: "",
    postMessage: "",
    broadcastChannel: "",
  });

  const { mode = "url", msg } = use(params);
  const channel = new BroadcastChannel("test_channel");

  useEffect(() => {
    if (mode === "url") {
      setMessage((message) => {
        return { ...message, url: msg ?? "" };
      });
    } else if (mode === "localStorage") {
      const handler = () => {
        setMessage((msg) => {
          return {
            ...msg,
            localStorage: localStorage.getItem("message") ?? "",
          };
        });
        localStorage.removeItem("message");
      };
      window.addEventListener("storage", handler);
      return () => {
        window.removeEventListener("storage", handler);
      };
    } else if (mode === "postMessage") {
      const handler = (e: MessageEvent) => {
        setMessage((msg) => {
          return {
            ...msg,
            postMessage: e.data.text ?? "",
          };
        });
      };
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    } else if (mode === "broadcastChannel") {
      channel.onmessage = (e) =>
        setMessage((msg) => {
          return {
            ...msg,
            broadcastChannel: e.data ?? "",
          };
        });
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden p-4">
      <h2 className="font-bold">Page B</h2>
      <div className="mt-4 w-full space-y-2 rounded-lg border p-2">
        {message[mode] ? (
          <p className="text-body text-primary">{message[mode]}</p>
        ) : (
          <p className="text-text-primary">No messages yet</p>
        )}
      </div>
    </div>
  );
};
