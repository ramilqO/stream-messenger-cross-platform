import type { DependencyContainer } from "tsyringe";

import type { CoreRuntime, FeatureModule } from "../../kernel/CoreRuntime";
import type { IEventBus } from "../../kernel/EventBus";
import { LoginUseCase } from "./application/LoginUseCase";
import { AuthRepositoryInMemory } from "./infrastructure/AuthRepositoryInMemory";

export class AuthModule implements FeatureModule {
  register(
    container: DependencyContainer,
    eventBus: IEventBus,
    runtime: CoreRuntime
  ) {
    container.register("IAuthRepository", { useClass: AuthRepositoryInMemory });

    container.register("LoginUseCase", {
      useFactory: (c) =>
        new LoginUseCase(c.resolve("IAuthRepository"), eventBus),
    });

    runtime.registerFacade("auth", {
      login: async (email: string, password: string) => {
        const uc = container.resolve<LoginUseCase>("LoginUseCase");
        return uc.execute(email, password);
      },
    });
  }
}
