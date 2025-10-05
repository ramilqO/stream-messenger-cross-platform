import { DependencyContainer } from "tsyringe";
import { IEventBus } from "../../kernel/EventBus";
import { SendMessageUseCase } from "./application/use-cases/SendMessageUseCase";
import { MessageRepositoryInMemory } from "./infrastructure/MessageRepositoryInMemory";
import { FeatureModule } from "../../kernel/CoreRuntime";

export class MessageModule implements FeatureModule {
  register(container: DependencyContainer, eventBus: IEventBus) {
    container.register("IMessageRepository", {
      useClass: MessageRepositoryInMemory,
    });
    container.register("SendMessageUseCase", {
      useFactory: (c) =>
        new SendMessageUseCase(c.resolve("IMessageRepository"), eventBus),
    });

    // Внутренняя подписка на событие (пример)
    eventBus.subscribe("MessageSentEvent", (ev: any) => {
      console.log("[module] MessageSentEvent received:", ev.message.content);
    });
  }
}
