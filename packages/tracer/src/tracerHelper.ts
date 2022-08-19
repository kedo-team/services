import * as api from "@opentelemetry/api"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { JaegerExporter } from "@opentelemetry/exporter-jaeger"

/**
 * Incapsulates a liitle bit entangled opentelemetry tracer logic
 */
export class TraceHelper {
  protected constructor(private serviceName: string, serviceVersion: string) {
    // should register opentelemetry tracer before usage
    this.registerOpenTelemetryProvider(serviceName, serviceVersion)
  }

  private static instances = new Map<string, TraceHelper>()

  /**
   * Returns Trace instance for the service. Create one if need
   * @param serviceName
   * @returns
   */
  static getInstance(serviceName: string, serviceVersion: string): TraceHelper {
    if (this.instances.has(serviceName) === false) {
      const newTracer = new TraceHelper(serviceName, serviceVersion)
      this.instances.set(serviceName, newTracer)
      return newTracer
    }

    return this.instances.get(serviceName)!
  }

  private get openTelementryTracer() {
    return api.trace.getTracer(this.serviceName)
  }

  public async traceTask(name: string, task: (...args) => Promise<any>, ...args): Promise<any> {
    // ref: https://opentelemetry.io/docs/instrumentation/js/instrumentation/#create-spans
    return this.openTelementryTracer.startActiveSpan(name, async span => {
      try {
        span.addEvent('start task')
        const result = await task(...args)
        span.addEvent('end task')
        span.setStatus({ code: api.SpanStatusCode.OK })
        return result
      } catch (ex) {
        span.recordException(ex)
        span.setStatus({ code: api.SpanStatusCode.ERROR })
        throw ex
      } finally {
        span.end()
      }
    })
  }

  private registerOpenTelemetryProvider(serviceName: string, serviceVersion: string) {
    // ref: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
    const resource =
      Resource.default().merge(
        new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
          [SemanticResourceAttributes.SERVICE_VERSION]: serviceVersion,
        })
      )
    const provider = new NodeTracerProvider({
        resource: resource,
    })
    const exporter = new JaegerExporter({})
    const processor = new SimpleSpanProcessor(exporter)
    provider.addSpanProcessor(processor)
    provider.register()
  }
}
