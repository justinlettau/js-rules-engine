import { defaultOperators } from './default-operators';
import { Engine } from './engine';
import { Operator } from './operator';

describe('Engine class', () => {
  describe('addOperator method', () => {
    it('should add operator', () => {
      const engine = new Engine();
      const operator = new Operator('noop', (a: any, b: any) => true);
      engine.addOperator(operator);
      expect((engine as any).operators.length).toEqual(defaultOperators.length + 1);
    });

    it('should throw error if operator already exists', () => {
      const engine = new Engine();
      const operator = new Operator('equals', (a: any, b: any) => true);
      expect(() => engine.addOperator(operator)).toThrowError();
    });
  });

  describe('removeOperator method', () => {
    it('should remove operator', () => {
      const engine = new Engine();
      engine.removeOperator('notEquals');
      expect((engine as any).operators.length).toEqual(defaultOperators.length - 1);
    });

    it('should no nothing if operator does not exists', () => {
      const engine = new Engine();
      engine.removeOperator('404');
      expect((engine as any).operators.length).toEqual(defaultOperators.length);
    });
  });

  describe('getOperator method', () => {
    it('should return operator', () => {
      const engine = new Engine();
      const operator = engine.getOperator('equals');
      expect(operator).toBeDefined();
    });

    it('should throw error if operator does not exists', () => {
      const engine = new Engine();
      expect(() => engine.getOperator('404')).toThrowError();
    });
  });
});
