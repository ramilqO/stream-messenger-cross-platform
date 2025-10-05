import { IEventBus } from "../../../../kernel/EventBus";
import { MessageSentEvent } from "../../domain/events/MessageSentEvent";
import { Message } from "../../domain/entities/Message";
import { IMessageRepository } from "../interfaces/IMessageRepository";

type Req = { chatId: string; senderId: string; content: string };

export class SendMessageUseCase {
  constructor(private repo: IMessageRepository, private eventBus: IEventBus) {}

  async execute(req: Req): Promise<Message> {
    const message = new Message(
      crypto.randomUUID(),
      req.chatId,
      req.senderId,
      req.content
    );

    await this.repo.persist(message);
    await this.repo.pushToNetwork(message);
    await this.eventBus.publish(new MessageSentEvent(message));

    return message;
  }
}
