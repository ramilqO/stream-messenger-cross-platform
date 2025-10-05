import { CoreRuntime } from "./kernel/CoreRuntime";
import { MessageModule } from "./modules/messaging/module";

export function createAppRuntime() {
  const runtime = new CoreRuntime();
  runtime.registerModule(new MessageModule());
  return runtime;
}
