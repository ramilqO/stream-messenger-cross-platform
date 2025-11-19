import { createContext, useContext } from "react";

import type { CoreRuntime } from "../../../packages/core/kernel/CoreRuntime";

export const RuntimeContext = createContext<CoreRuntime | null>(null);

export function useRuntime(): CoreRuntime {
  const ctx = useContext(RuntimeContext);

  if (!ctx) {
    throw new Error("useRuntime must be used inside <RuntimeProvider>");
  }

  return ctx;
}
