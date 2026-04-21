/**
 * Extendable interface for all public module facades.
 * Each module should augment this interface with its own facade type.
 *
 * @example
 * ```typescript
 * declare module '@core/kernel/Facades' {
 *   export interface FacadesMap {
 *     auth: AuthFacade;
 *   }
 * }
 * ```
 */
export interface FacadesMap {}
