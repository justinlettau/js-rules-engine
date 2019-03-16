import { OperatorFn } from './interfaces';

/**
 * Operator.
 */
export class Operator {
  constructor(name: string, fn: OperatorFn) {
    this.name = name;
    this.fn = fn;
  }

  /**
   * Operator name.
   */
  name: string;

  /**
   * Operator callback function.
   */
  fn: OperatorFn;

  /**
   * Use the provided callback function to evaluate to values.
   *
   * @param a Left side value.
   * @param b Right side value.
   */
  evaluate(a: any, b: any) {
    return this.fn(a, b);
  }
}
