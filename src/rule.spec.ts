import { person } from '../test/mock-data';
import { Condition } from './condition';
import { RuleJson } from './interfaces';
import { Rule } from './rule';

describe('Rule class', () => {
  describe('constructor', () => {
    it('should hydrate correctly', () => {
      const json: RuleJson = {
        items: [
          {
            fact: 'name',
            operator: 'equals',
            value: 'Luke Skywalker'
          },
          {
            items: [
              {
                fact: 'height',
                operator: 'lessThan',
                value: 200
              },
              {
                fact: 'height',
                operator: 'greaterThan',
                value: 100
              }
            ],
            type: 'or'
          }
        ],
        type: 'and'
      };
      const rule = new Rule(json) as any;
      expect(rule.type).toEqual('and');
      expect(rule.items.length).toEqual(2);
      expect(rule.items[0] instanceof Condition).toEqual(true);
      expect(rule.items[1] instanceof Rule).toEqual(true);
      expect(rule.items[1].type).toEqual('or');
      expect(rule.items[1].items.length).toEqual(2);
      expect(rule.items[1].items[0] instanceof Condition).toEqual(true);
      expect(rule.items[1].items[1] instanceof Condition).toEqual(true);
    });
  });

  describe('equals method', () => {
    it('should evaluate true when value equals fact', () => {
      const rule = new Rule().equals('name', 'Luke Skywalker');
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('notEquals method', () => {
    it('should evaluate false when value equals fact', () => {
      const rule = new Rule().notEquals('name', 'Luke Skywalker');
      expect(rule.evaluate(person)).toEqual(false);
    });
  });

  describe('in method', () => {
    it('should evaluate true when value is in fact', () => {
      const rule = new Rule().in('name', 'Skywalker');
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('notIn method', () => {
    it('should evaluate false when value is in fact', () => {
      const rule = new Rule().notIn('name', 'Skywalker');
      expect(rule.evaluate(person)).toEqual(false);
    });
  });

  describe('contains method', () => {
    it('should evaluate true when value contains fact', () => {
      const rule = new Rule().contains('vehicles', 'Snowspeeder');
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('notContains method', () => {
    it('should evaluate false when value contains fact', () => {
      const rule = new Rule().notContains('vehicles', 'Snowspeeder');
      expect(rule.evaluate(person)).toEqual(false);
    });
  });

  describe('lessThan method', () => {
    it('should evaluate true when value is less than fact', () => {
      const rule = new Rule().lessThan('height', 200);
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('lessThanOrEquals method', () => {
    it('should evaluate true when value is less than fact', () => {
      const rule = new Rule().lessThanOrEquals('height', 200);
      expect(rule.evaluate(person)).toEqual(true);
    });

    it('should evaluate true when value equals fact', () => {
      const rule = new Rule().lessThanOrEquals('height', 200);
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('greaterThan method', () => {
    it('should evaluate true when value is greater than fact', () => {
      const rule = new Rule().greaterThan('height', 100);
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('greaterThanOrEquals method', () => {
    it('should evaluate true when value is greater than fact', () => {
      const rule = new Rule().greaterThanOrEquals('height', 100);
      expect(rule.evaluate(person)).toEqual(true);
    });

    it('should evaluate true when value equals fact', () => {
      const rule = new Rule().greaterThanOrEquals('height', 172);
      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  describe('and method', () => {
    it('should evaluate true when all conditions are true', () => {
      const rule = new Rule().and(item => {
        item.equals('name', 'Luke Skywalker').equals('eyeColor', 'blue');
      });

      expect(rule.evaluate(person)).toEqual(true);
    });

    it('should evaluate false when any conditions are false', () => {
      const rule = new Rule().and(item => {
        item.equals('name', 'Luke Skywalker').equals('eyeColor', 'green');
      });

      expect(rule.evaluate(person)).toEqual(false);
    });
  });

  describe('or method', () => {
    it('should evaluate true when any condition is true', () => {
      const rule = new Rule().or(item => {
        item.equals('name', 'Luke Skywalker').equals('eyeColor', 'green');
      });

      expect(rule.evaluate(person)).toEqual(true);
    });

    it('should evaluate false when no conditions are true', () => {
      const rule = new Rule().or(item => {
        item.equals('name', 'Han Solo').equals('eyeColor', 'green');
      });

      expect(rule.evaluate(person)).toEqual(true);
    });
  });

  it('complex rules should evaluate correctly', () => {
    const rule = new Rule().equals('homeWorld.name', 'Tatooine').or(sub => {
      sub.contains('name', 'Skywalker').equals('eyeColor', 'green');
    });

    expect(rule.evaluate(person)).toEqual(true);
  });

  describe('toJSON method', () => {
    it('should stringify correctly', () => {
      const rule = new Rule().equals('name', 'Luke Skywalker');
      const result = JSON.stringify(rule);

      expect(result).toEqual('{"items":[{"fact":"name","operator":"equals","value":"Luke Skywalker"}],"type":"and"}');
    });
  });
});
