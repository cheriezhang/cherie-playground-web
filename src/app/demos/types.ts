export type TMode = "url" | "localStorage" | "postMessage" | "broadcastChannel";

export type TParams = {
  mode?: TMode;
  msg?: string;
};
