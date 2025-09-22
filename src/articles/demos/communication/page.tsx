"use client";

import { useEffect, useRef } from "react";

export const UrlDemo = () => {
  return (
    <iframe
      src="/demos/A?mode=url"
      title="PageA"
      className="w-full rounded-2xl"
    />
  );
};

export const LocalStorage = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1">
        <iframe
          src="/demos/A?mode=localStorage"
          title="PageA"
          className="w-full rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <iframe
          src="/demos/B?mode=localStorage"
          title="PageB"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export const PostMessage = () => {
  const iframeARef = useRef<HTMLIFrameElement>(null);
  const iframeBRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.source === iframeARef.current?.contentWindow) {
        // A 发来的消息 → 转发给 B
        iframeBRef.current?.contentWindow?.postMessage(e.data, "*");
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <iframe
            ref={iframeARef}
            src="/demos/A?mode=postMessage"
            title="PageA"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="flex-1">
          <iframe
            ref={iframeBRef}
            src="/demos/B?mode=postMessage"
            title="PageB"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export const BroadcastChannel = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1">
        <iframe
          src="/demos/A?mode=broadcastChannel"
          title="PageA"
          className="w-full rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <iframe
          src="/demos/B?mode=broadcastChannel"
          title="PageB"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
};
