import { defaultOperators } from './default-operators';
import { Operator } from './operator';

/**
 * Engine.
 */
export class Engine {
  constructor() {
    this.operators = [...defaultOperators];
  }

  /**
   * Registered operators.
   */
  private operators: Operator[] = [];

  /**
   * Get operator by name.
   *
   * @param name Operator name.
   */
  getOperator(name: string) {
    const operator = this.operators.find((item) => item.name === name);

    if (!operator) {
      throw new Error(`Engine: operator "${name}" not found`);
    }

    return operator;
  }

  /**
   * Add an operator.
   *
   * @param operator Operator to add.
   */
  addOperator(operator: Operator) {
    const exists = this.operators.some((item) => item.name === operator.name);

    if (exists) {
      throw new Error(`Engine: operator "${operator.name}" already exists`);
    }

    this.operators.push(operator);
  }

  /**
   * Remove an operator by name.
   *
   * @param name Operator name.
   */
  removeOperator(name: string) {
    const index = this.operators.findIndex((item) => item.name === name);

    if (index !== -1) {
      this.operators.splice(index, 1);
    }
  }
}
