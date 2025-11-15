import { AuthRepositoryInMemory } from "../infrastructure/AuthRepositoryInMemory";
import type { IEventBus } from "../../../kernel/EventBus";
import { UserLoggedInEvent } from "../domain/events";

export class LoginUseCase {
  constructor(
    private repo: AuthRepositoryInMemory,
    private eventBus: IEventBus
  ) {}

  async execute(email: string, password: string) {
    const user = await this.repo.login(email, password);
    await this.eventBus.publish(new UserLoggedInEvent(user));
    
    return user;
  }
}
