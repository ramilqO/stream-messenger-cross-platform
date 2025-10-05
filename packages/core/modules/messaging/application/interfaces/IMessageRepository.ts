import { Message } from "../../domain/entities/Message";

export interface IMessageRepository {
  persist(message: Message): Promise<void>;
  pushToNetwork(message: Message): Promise<void>;
  getAll(): Message[];
}
