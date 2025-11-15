import { createRoot } from "react-dom/client";
import { bootstrap } from "../../../packages/core/bootstrap";
import { LoginScreen } from "./LoginScreen";
import { RuntimeProvider } from "./RuntimeProvider";

(async () => {
  const runtime = await bootstrap();

  createRoot(document.getElementById("root")!).render(
    <RuntimeProvider runtime={runtime}>
      <LoginScreen />
    </RuntimeProvider>
  );
})();
