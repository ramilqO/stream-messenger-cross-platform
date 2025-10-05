import { IMessageRepository } from "../application/interfaces/IMessageRepository";
import { Message } from "../domain/entities/Message";

export class MessageRepositoryInMemory implements IMessageRepository {
  private store: Message[] = [];

  async persist(message: Message) {
    this.store.push(message);
  }

  async pushToNetwork(message: Message) {
    console.log("[network] sending message:", message.content);
    await new Promise((r) => setTimeout(r, 50)); // эмуляция сети
  }

  getAll(): Message[] {
    return [...this.store];
  }
}
