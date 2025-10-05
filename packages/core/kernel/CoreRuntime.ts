import { container as globalContainer, DependencyContainer } from "tsyringe";
import { RxEventBus } from "./RxEventBus";
import { IEventBus } from "./EventBus";

export interface FeatureModule {
  register(container: DependencyContainer, eventBus: IEventBus): void;
}

export class CoreRuntime {
  readonly container: DependencyContainer;
  readonly eventBus: IEventBus;

  constructor(container?: DependencyContainer, eventBus?: IEventBus) {
    this.container = container ?? globalContainer.createChildContainer();
    this.eventBus = eventBus ?? new RxEventBus();
    this.container.registerInstance<IEventBus>("IEventBus", this.eventBus);
  }

  registerModule(module: FeatureModule) {
    module.register(this.container, this.eventBus);
  }

  resolve<T>(token: any): T {
    return this.container.resolve<T>(token);
  }
}
