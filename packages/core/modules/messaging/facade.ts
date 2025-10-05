import { CoreRuntime } from "../../kernel/CoreRuntime";
import { IMessageRepository } from "./application/interfaces/IMessageRepository";
import { SendMessageUseCase } from "./application/use-cases/SendMessageUseCase";
import { Message } from "./domain/entities/Message";
import { MessageSentEvent } from "./domain/events/MessageSentEvent";

export function createMessagingFacade(runtime: CoreRuntime) {
  // Достаём зависимости через DI
  const sendMessageUseCase =
    runtime.resolve<SendMessageUseCase>("SendMessageUseCase");
  const messageRepo = runtime.resolve<IMessageRepository>("IMessageRepository");

  return {
    /**
     * Отправка сообщения (через UseCase)
     */
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
     */
    onMessageSent(handler: (message: Message) => void) {
      return runtime.eventBus.subscribe<MessageSentEvent>(
        "MessageSentEvent",
        (ev) => handler(ev.message)
      );
    },
  };
}
