import { DslTranslator } from './dsl.translator'
import * as fs from 'fs/promises'
import { DslPrototype } from '../dsl.prototype'
import * as yaml from 'js-yaml'
import jsonata from 'jsonata'
import path from 'path'

const translatorFilePath = path.resolve(__dirname, './dsl2xstate.transform.JSONata')

export class DslXstateTranslator implements DslTranslator {

  private constructor() { }
  private static instance: DslXstateTranslator;

  public static async getInstance(): Promise<DslTranslator> {
    if (!DslXstateTranslator.instance) {
      DslXstateTranslator.instance = new DslXstateTranslator()
      await DslXstateTranslator.instance.setup()
    }
    return DslXstateTranslator.instance
  }

  private translateExpr: jsonata.Expression | undefined

  public translate(dsl: DslPrototype): object {
    const dslJson = this.yaml2json(dsl)
    const result = this.translateExpr?.evaluate(dslJson)
    return result
  }

  private async setup() {
    const jsonataStr = await this.getTransformFileContent()
    this.jsonata = jsonataStr
    try {
      this.translateExpr = jsonata(jsonataStr)
    } catch (cause) {
      throw new Error(`Can't compile transformation string to JSONata object`,
      // TODO: remove ts-ignore when TS begins to support cause clause
      //@ts-ignore
       { cause })
    }
  }

  public jsonata: any

  private async getTransformFileContent(): Promise<string> {
    let fileContent: string
    try {
      fileContent = await fs.readFile(translatorFilePath, 'utf8')
    } catch (cause) {
      throw new Error(`Can't load transformation file from path: ${translatorFilePath}`,
      // TODO: remove ts-ignore when TS begins to support cause clause
      //@ts-ignore
       { cause })
    }

    return fileContent
  }

  private yaml2json(dsl: DslPrototype): object {
    let json: object
    try {
      json = yaml.load(dsl)
    } catch (cause) {
      throw new Error('DSL prototype has bad shape. Can not load as json',
      // TODO: remove ts-ignore when TS begins to support cause clause
      //@ts-ignore
      { cause })
    }

    return json
  }
}
