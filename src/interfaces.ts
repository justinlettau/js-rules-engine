/**
 * Rule type.
 */
export type RuleType = 'and' | 'or';

/**
 * Operator callback function.
 */
export type OperatorFn = (a: any, b: any) => boolean;

/**
 * Rule json configuration.
 */
export interface RuleJson extends Object {
  and?: Array<RuleJson | ConditionJson>;
  or?: Array<RuleJson | ConditionJson>;
};

/**
 * Condition json configuration.
 */
export interface ConditionJson {
  fact: string;
  operator: string;
  value: any;
}
