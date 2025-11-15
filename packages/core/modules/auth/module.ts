import type { FeatureModule } from "../../kernel/CoreRuntime";
import { AuthRepositoryInMemory } from "./infrastructure/AuthRepositoryInMemory";
import { LoginUseCase } from "./application/LoginUseCase";

export class AuthModule implements FeatureModule {
  register(container, eventBus, runtime) {
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
