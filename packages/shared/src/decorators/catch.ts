interface CatchOptions {
    source: string
    fallbackValue?: unknown
}

export function Catch(options: CatchOptions) {
    return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = async function (...args: unknown[]) {
            try {
                return await originalMethod.apply(this, args)
            } catch (error) {
                console.error(`Unhandled error in [${options.source}.${propertyKey}]`, error, { args })

                return options.fallbackValue
            }
        }

        return descriptor
    }
}
