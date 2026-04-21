// Core runtime
export { CoreRuntime, type FeatureModule } from './CoreRuntime'

// Domain events
export { DomainEvent, type DomainEventMap } from './DomainEvent'

// Event bus
export type { IEventBus } from './EventBus'
export { RxEventBus } from './RxEventBus'

// Error handling
export { ErrorBoundary, type ErrorContext, type ErrorHandler } from './ErrorBoundary'

// Facades
export type { FacadesMap } from './Facades'
