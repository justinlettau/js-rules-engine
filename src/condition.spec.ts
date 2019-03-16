import { Condition } from './condition';
import { defaultEngine } from './default-engine';
import { ConditionJson } from './interfaces';

describe('Condition class', () => {
  describe('constructor', () => {
    const json: ConditionJson = {
      fact: 'name',
      operator: 'equals',
      value: 'Luke Skywalker'
    };

    it('should hydrate correctly', () => {
      const condition = new Condition(json, defaultEngine) as any;
      expect(condition.engine).toBeDefined();
      expect(condition.fact).toEqual('name');
      expect(condition.operator).toEqual(defaultEngine.getOperator('equals'));
      expect(condition.value).toEqual('Luke Skywalker');
    });

    it('should require json param', () => {
      expect(() => new Condition(undefined as any, defaultEngine)).toThrowError();
    });

    it('should require json fact property', () => {
      const invalidJson = { ...json };
      delete invalidJson.fact;
      expect(() => new Condition(invalidJson, defaultEngine)).toThrowError();
    });

    it('should require json operator property', () => {
      const invalidJson = { ...json };
      delete invalidJson.operator;
      expect(() => new Condition(invalidJson, defaultEngine)).toThrowError();
    });

    it('should require engine param', () => {
      expect(() => new Condition(json, undefined as any)).toThrowError();
    });
  });

  describe('toJSON method', () => {
    it('should stringify correctly', () => {
      const json = { fact: 'name', operator: 'equals', value: 'Luke Skywalker' };
      const condition = new Condition(json, defaultEngine);
      const result = JSON.stringify(condition);
      expect(result).toEqual('{"fact":"name","operator":"equals","value":"Luke Skywalker"}');
    });
  });
});
