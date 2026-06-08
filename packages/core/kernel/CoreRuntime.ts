import 'reflect-metadata'

import { container as globalContainer, type DependencyContainer } from 'tsyringe'

import type { DomainEventMap } from './DomainEvent'
import { ErrorBoundary } from './ErrorBoundary'
import type { IEventBus } from './EventBus'
import { FacadesMap } from './Facades'
import { RxEventBus } from './RxEventBus'

/**
 * Contract for a feature module that can be plugged into the core runtime.
 */
export interface FeatureModule {
    /**
     * Registers module dependencies, event subscriptions, and facades.
     * @param container - DI container (child of the global container).
     * @param eventBus - Shared domain event bus.
     * @param runtime - Core runtime instance (allows facade registration).
     */
    register(container: DependencyContainer, eventBus: IEventBus, runtime: CoreRuntime): void
}

/**
 * Core runtime that holds the DI container, event bus, error boundary, and registered facades.
 * It serves as the main entry point for the application.
 */
export class CoreRuntime {
    /** Dependency injection container (child of the global container). */
    readonly container: DependencyContainer

    /** Shared domain event bus. */
    readonly eventBus: IEventBus

    /** Central error handler for use cases and event subscribers. */
    readonly errorBoundary: ErrorBoundary

    private facades: Partial<FacadesMap> = {}
    private disposables: Array<() => void> = []

    /**
     * Creates a new CoreRuntime instance.
     * @param container - Optional custom DI container; defaults to a child of the global container.
     * @param eventBus - Optional custom event bus; defaults to RxEventBus.
     */
    constructor(container?: DependencyContainer, eventBus?: IEventBus) {
        this.container = container ?? globalContainer.createChildContainer()
        this.eventBus = eventBus ?? new RxEventBus()
        this.errorBoundary = new ErrorBoundary()

        // Default handler – logs errors to console
        this.errorBoundary.addHandler((error, context) => {
            console.error(`[Error] ${context.source} "${context.name}" failed:`, error)
        })
    }

    /**
     * Registers a feature module, calling its `register` method.
     * @param module - The module to register.
     */
    registerModule(module: FeatureModule): void {
        module.register(this.container, this.eventBus, this)
    }

    /**
     * Subscribes to a domain event with error boundary protection and lifecycle tracking.
     * Call {@link dispose} to unsubscribe all module listeners.
     */
    subscribeToEvent<E extends keyof DomainEventMap>(
        eventName: E,
        handler: (event: DomainEventMap[E]) => void,
    ): void {
        const wrapped = this.errorBoundary.wrapEventSubscriber(String(eventName), handler)
        const unsubscribe = this.eventBus.subscribe(eventName, wrapped)
        this.disposables.push(unsubscribe)
    }

    /** Unsubscribes all event listeners registered via {@link subscribeToEvent}. */
    dispose(): void {
        for (const unsubscribe of this.disposables) {
            unsubscribe()
        }
        this.disposables = []
    }

    /**
     * Registers a public facade for a module.
     * All facade methods are automatically wrapped with the error boundary.
     * @param name - The key under which the facade is exposed (must exist in FacadesMap).
     * @param api - The facade object that implements the module's public API.
     */
    registerFacade<K extends keyof FacadesMap>(name: K, api: FacadesMap[K]): void {
        const wrappedApi = this.wrapFacadeMethods(api, name as string)
        this.facades[name] = wrappedApi
    }

    /**
     * Returns all registered facades (partial, because modules may not have been registered yet).
     * @returns Partial mapping from facade names to their implementations.
     */
    getFacades(): Partial<FacadesMap> {
        return this.facades
    }

    /**
     * Retrieves a specific facade by its key.
     * Throws an error if the facade has not been registered.
     * @param name - The facade key.
     * @returns The registered facade.
     */
    getFacade<K extends keyof FacadesMap>(name: K): FacadesMap[K] {
        const facade = this.facades[name]

        if (!facade) {
            throw new Error(
                `Facade "${String(name)}" is not registered. Did you forget to register the module?`,
            )
        }

        return facade
    }

    /**
     * Wraps all methods of a facade object with the error boundary's `wrapUseCase`.
     * Non‑function properties are left untouched.
     * @param api - The original facade object.
     * @param facadeName - Name of the facade (used for error context).
     * @returns A new object with wrapped methods.
     */
    private wrapFacadeMethods<T extends object>(api: T, facadeName: string): T {
        const wrapped: any = {}
        for (const key of Object.keys(api)) {
            const method = (api as any)[key]
            if (typeof method === 'function') {
                wrapped[key] = async (...args: unknown[]) => {
                    return this.errorBoundary.wrapUseCase(
                        `${facadeName}.${key}`,
                        () => method.apply(api, args),
                        { args },
                    )
                }
            } else {
                wrapped[key] = method
            }
        }
        return wrapped
    }
}
