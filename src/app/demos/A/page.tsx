"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components";

export default function PageA() {
  const params = useSearchParams();
  const mode = params.get("mode");

  const router = useRouter();
  const channel = new BroadcastChannel("test_channel");

  const sendMessage = () => {
    const msg = `Hello from A`;
    if (mode === "url") {
      router.push(`/demos/B?mode=url&msg=${msg}`);
    } else if (mode === "localStorage") {
      localStorage.setItem("message", msg);
    } else if (mode === "broadcastChannel") {
      channel.postMessage(msg);
    } else if (mode === "postMessage") {
      //先发给父页面，由父页面转发
      window.parent.postMessage({ from: "A", text: msg }, "*");
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <h2 className="font-bold">Page A</h2>
      <Button kind="primary" onClick={sendMessage}>
        Send Message by {mode}
      </Button>
    </div>
  );
}
