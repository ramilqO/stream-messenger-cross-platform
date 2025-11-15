import { RuntimeContext } from "./RuntimeContext";

export function RuntimeProvider({ runtime, children }) {
  return (
    <RuntimeContext.Provider value={runtime}>
      {children}
    </RuntimeContext.Provider>
  );
}
