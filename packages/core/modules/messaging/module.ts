import { DependencyContainer } from "tsyringe";
import { IEventBus } from "../../kernel/EventBus";
import { SendMessageUseCase } from "./application/use-cases/SendMessageUseCase";
import { MessageRepositoryInMemory } from "./infrastructure/MessageRepositoryInMemory";
import { FeatureModule } from "../../kernel/CoreRuntime";
import "./domain/events/events-map"; // for TS module augmentation

export class MessageModule implements FeatureModule {
  register(container: DependencyContainer, eventBus: IEventBus) {
    container.register("IMessageRepository", {
      useClass: MessageRepositoryInMemory,
    });
    container.register("SendMessageUseCase", {
      useFactory: (c) =>
        new SendMessageUseCase(c.resolve("IMessageRepository"), eventBus),
    });

    eventBus.subscribe("MessageSentEvent", (event) => {
      console.log("[module] MessageSentEvent received:", event.message.content);
    });
  }
}
