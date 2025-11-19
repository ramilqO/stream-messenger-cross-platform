import "reflect-metadata";

import {
  container as globalContainer,
  type DependencyContainer,
} from "tsyringe";

import type { IEventBus } from "./EventBus";
import { RxEventBus } from "./RxEventBus";

export interface FeatureModule {
  register(
    container: DependencyContainer,
    eventBus: IEventBus,
    runtime: CoreRuntime
  ): void;
}

export class CoreRuntime {
  readonly container: DependencyContainer;
  readonly eventBus: IEventBus;
  private facades: Record<string, any> = {};

  constructor(container?: DependencyContainer, eventBus?: IEventBus) {
    this.container = container ?? globalContainer.createChildContainer();
    this.eventBus = eventBus ?? new RxEventBus();
  }

  registerModule(module: FeatureModule) {
    module.register(this.container, this.eventBus, this);
  }

  registerFacade(name: string, api: any) {
    this.facades[name] = api;
  }

  getFacades() {
    return this.facades;
  }
}
