import { DslPrototype } from '../dsl.prototype'

export abstract class DslTranslator {
  abstract translate(dsl: DslPrototype)
}
