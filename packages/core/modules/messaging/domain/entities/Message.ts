export class Message {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly senderId: string,
    public readonly content: string,
    public readonly createdAt: Date = new Date()
  ) {}
}
