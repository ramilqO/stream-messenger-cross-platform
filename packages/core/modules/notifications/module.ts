import type { FeatureModule } from "../../kernel/CoreRuntime";

export class NotificationsModule implements FeatureModule {
  register(_container, eventBus, _runtime) {
    eventBus.subscribe("UserLoggedInEvent", (event: any) => {
      console.log("🔔 Notification:", event.user.email, "logged in");
    });
  }
}
