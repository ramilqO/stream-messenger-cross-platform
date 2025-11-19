import "./domain/events/events";

import type { DependencyContainer } from "tsyringe";

import type { CoreRuntime, FeatureModule } from "../../kernel/CoreRuntime";
import type { IEventBus } from "../../kernel/EventBus";

export class NotificationsModule implements FeatureModule {
  register(
    _container: DependencyContainer,
    eventBus: IEventBus,
    _runtime: CoreRuntime
  ) {
    eventBus.subscribe("UserLoggedInEvent", (event: any) => {
      console.log("🔔 Notification:", event.user.email, "logged in");
    });
  }
}
