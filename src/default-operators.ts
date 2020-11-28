import { Operator } from './operator';

/**
 * Default operators.
 */
export const defaultOperators = [
  new Operator('equals', (a, b) => a === b),
  new Operator('notEquals', (a, b) => a !== b),
  new Operator('in', (a, b) => a.indexOf(b) > -1),
  new Operator('notIn', (a, b) => a.indexOf(b) === -1),
  new Operator('contains', (a, b) => a.indexOf(b) > -1),
  new Operator('notContains', (a, b) => a.indexOf(b) === -1),
  new Operator('lessThan', (a, b) => a < b),
  new Operator('lessThanOrEquals', (a, b) => a <= b),
  new Operator('greaterThan', (a, b) => a > b),
  new Operator('greaterThanOrEquals', (a, b) => a >= b),
];
