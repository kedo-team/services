import { TraceHelper } from './tracerHelper'

export function trace(target: Object, propertyKey: string, descriptor: PropertyDescriptor):
void | PropertyDescriptor {
  console.log('decorator function runs')
  // TODO: If we need to properly configure tracer here is the place for it

  const tracer = TraceHelper.getInstance(process.env.npm_package_name!, process.env.npm_package_version!)
  const originalMethod = descriptor.value
  descriptor.value = function(...args) {
    return tracer.traceTask(propertyKey,
      originalMethod.bind(this),
      ...args)
  }

  return descriptor
}
