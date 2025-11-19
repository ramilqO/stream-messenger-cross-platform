import 'reflect-metadata'

import {
    container as globalContainer,
    type DependencyContainer,
} from 'tsyringe'

import type { IEventBus } from './EventBus'
import { FacadesMap } from './Facades'
import { RxEventBus } from './RxEventBus'

/**
 * Interface for a feature module.
 * Each module can subscribe to events or register facades in the CoreRuntime.
 */
export interface FeatureModule {
    register(
        container: DependencyContainer,
        eventBus: IEventBus,
        runtime: CoreRuntime
    ): void
}

/**
 * CoreServices for container.resolve method type-safety
 */
export interface CoreServices {}

/**
 * Core runtime providing DI container and event bus.
 * Also manages facades for the public API of modules.
 */
export class CoreRuntime {
    readonly container: DependencyContainer
    readonly eventBus: IEventBus
    private facades: Partial<FacadesMap> = {}

    constructor(container?: DependencyContainer, eventBus?: IEventBus) {
        this.container = container ?? globalContainer.createChildContainer()
        this.eventBus = eventBus ?? new RxEventBus()
    }

    /**
     * Registers a module in the core runtime.
     * @param module - The module to register
     */
    registerModule(module: FeatureModule) {
        module.register(this.container, this.eventBus, this)
    }

    /**
     * Registers a facade for a module's public API.
     * @param name - The facade key from FacadesMap
     * @param api - The facade object
     */
    registerFacade<K extends keyof FacadesMap>(name: K, api: FacadesMap[K]) {
        this.facades[name] = api
    }

    /**
     * Returns all registered facades.
     */
    getFacades() {
        return this.facades
    }
}
