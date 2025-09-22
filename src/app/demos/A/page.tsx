"use client";

import { Suspense } from "react";

import { Loading } from "@/components";

import { Client } from "./client";

export default function PageA() {
  return (
    <Suspense fallback={<Loading />}>
      <Client />
    </Suspense>
  );
}
