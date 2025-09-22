import { Suspense } from "react";

import type { TParams } from "../types";
import { Client } from "./client";

export default function PageB({
  searchParams,
}: {
  searchParams: Promise<TParams>;
}) {
  return (
    <Suspense fallback={<>...</>}>
      <Client params={searchParams} />
    </Suspense>
  );
}
