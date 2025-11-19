import type { CoreRuntime } from "../../../packages/core/kernel/CoreRuntime";
import { RuntimeContext } from "./RuntimeContext";

export function RuntimeProvider({
  runtime,
  children,
}: {
  runtime: CoreRuntime;
  children: React.ReactNode;
}) {
  return (
    <RuntimeContext.Provider value={runtime}>
      {children}
    </RuntimeContext.Provider>
  );
}
