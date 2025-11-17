import { CoreRuntime } from "./kernel/CoreRuntime";
import { AuthModule } from "./modules/auth/module";
import { NotificationsModule } from "./modules/notifications/module";

export async function bootstrap() {
  const runtime = new CoreRuntime();

  runtime.registerModule(new AuthModule());
  runtime.registerModule(new NotificationsModule());

  return runtime;
}

