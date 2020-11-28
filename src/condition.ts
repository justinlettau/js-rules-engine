import { get } from 'ts-dot-prop';

import { Engine } from './engine';
import { ConditionJson } from './interfaces';
import { Operator } from './operator';

/**
 * Condition.
 */
export class Condition {
  constructor(config: ConditionJson, engine: Engine) {
    this.init(config, engine);
  }

  /**
   * Condition fact.
   */
  private fact: string;

  /**
   * Condition operator.
   */
  private operator: Operator;

  /**
   * Condition value.
   */
  private value: any;

  /**
   * Engine instance.
   */
  private engine: Engine;

  /**
   * Evaluate a rule's conditions against the provided data.
   *
   * @param data Data object to use.
   */
  evaluate(data: Record<string, unknown>) {
    const factValue = get(data, this.fact);
    return this.operator.evaluate(factValue, this.value);
  }

  /**
   * To json.
   */
  toJSON() {
    return {
      fact: this.fact,
      operator: this.operator.name,
      value: this.value,
    };
  }

  /**
   * Init condition from configuration object.
   *
   * @param json Json object.
   * @param engine Engine instance to use.
   */
  private init(json: ConditionJson, engine: Engine) {
    if (!engine) {
      throw new Error('Condition: constructor requires engine instance');
    }

    this.engine = engine;

    if (!json) {
      throw new Error('Condition: constructor requires object');
    }

    if (!json.fact) {
      throw new Error('Condition: "fact" property is required');
    }

    if (!json.operator) {
      throw new Error('Condition: "operator" property is required');
    }

    this.fact = json.fact;
    this.operator = this.engine.getOperator(json.operator);
    this.value = json.value;
  }
}
