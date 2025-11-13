import { CoreRuntime } from "../../kernel/CoreRuntime";
import { IMessageRepository } from "./application/interfaces/IMessageRepository";
import { SendMessageUseCase } from "./application/use-cases/SendMessageUseCase";
import { Message } from "./domain/entities/Message";
// Импорт для активации module augmentation событий
import "./domain/events/events";

export function createMessagingFacade(runtime: CoreRuntime) {
  // Достаём зависимости через DI
  const sendMessageUseCase =
    runtime.resolve<SendMessageUseCase>("SendMessageUseCase");
  const messageRepo = runtime.resolve<IMessageRepository>("IMessageRepository");

  return {
    async sendMessage(
      chatId: string,
      senderId: string,
      content: string
    ): Promise<Message> {
      return await sendMessageUseCase.execute({ chatId, senderId, content });
    },

    /**
     * Получить все сообщения (через репозиторий)
     */
    getAllMessages(): Message[] {
      return messageRepo.getAll();
    },

    /**
     * Подписка на отправленные сообщения (через EventBus)
     * Возвращает функцию для отписки
     * Теперь тип события автоматически определяется через DomainEventMap
     */
    onMessageSent(handler: (message: Message) => void) {
      // TypeScript автоматически определит тип ev как MessageSentEvent через DomainEventMap
      return runtime.eventBus.subscribe("MessageSentEvent", (ev) =>
        handler(ev.message)
      );
    },
  };
}
