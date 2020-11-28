[![NPM Version](https://badge.fury.io/js/js-rules-engine.svg)](https://badge.fury.io/js/js-rules-engine)
[![CI](https://github.com/justinlettau/js-rules-engine/workflows/CI/badge.svg)](https://github.com/justinlettau/js-rules-engine/actions)
[![Dependency Status](https://david-dm.org/justinlettau/js-rules-engine.svg)](https://david-dm.org/justinlettau/js-rules-engine)
[![Dev Dependency Status](https://david-dm.org/justinlettau/js-rules-engine/dev-status.svg)](https://david-dm.org/justinlettau/js-rules-engine?type=dev)

# Rules Engine

JavaScript rules engine for validating data object structures.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Default Engine](#default-engine)
  - [Override Engine](#override-engine)
  - [Default Operators](#default-operators)
  - [Customizing Operators](#customizing-operators)
  - [Rule Conditions](#rule-conditions)
  - [Persisting Rules](#persisting-rules)
- [Development](#development)

# Features

- 💪 Easy to use **chainable API**.
- 💥 Support for **infinitely nested** `AND` / `OR` conditions.
- 🚀 Rules can be expressed in **simple JSON**.
- ✔️ **Customize operators** with your own functions.
- 🏄 Access nested properties with **dot notation** paths.

# Installation

```bash
npm install js-rules-engine --save
```

# Usage

```js
import { Rule } from 'js-rules-engine';

// homeWorld.name equals 'Tatooine' AND (name contains 'Skywalker' OR eyeColor is 'green')
const rule = new Rule().equals('homeWorld.name', 'Tatooine').or((sub) => {
  sub.contains('name', 'Skywalker').equals('eyeColor', 'green');
});

// object of data to evaluate rule against
const fact = {
  eyeColor: 'blue',
  homeWorld: {
    name: 'Tatooine',
  },
  name: 'Luke Skywalker',
};

rule.evaluate(fact);
// => true
```

## Default Engine

An `Engine` contains all operators available to a `Rule`. By default, a single `Engine` instance is used for all `Rule` instances. The default `Engine`'s operators can be customized like this:

```js
import { defaultEngine } from 'js-rules-engine';

defaultEngine.removeOperator('greaterThan');
defaultEngine.addOperator('moreGreaterThan', myAwesomeFunction);
```

## Override Engine

Each instance of `Rule` has the ability to use it's own `Engine` instance, overriding the default.

```js
import { Engine, Rule } from 'js-rules-engine';

const engine = new Engine();
const rule = new Rule(null, engine);
```

## Default Operators

Each `Engine` contains the follow operators by default:

- `equals`
- `notEquals`
- `in`
- `notIn`
- `contains`
- `notContains`
- `lessThan`
- `lessThanOrEquals`
- `greaterThan`
- `greaterThanOrEquals`

## Customizing Operators

Add your own operators to an `Engine`. Once added, any custom `Operator` can be used via the `Rule`'s `add()` method.

```js
import { defaultEngine, Operator } from 'js-rules-engine';

const noop = new Operator('noop', (a, b) => true);
defaultEngine.addOperator(noop);
```

You can also remove an `Operator`.

```js
import { defaultEngine } from 'js-rules-engine';

defaultEngine.removeOperator('noop');
```

## Rule Conditions

The `add` method is a generic way to add a condition to the `Rule`. The conditions operator is added via it's `name`.
The `value` type should match what the operator is expecting.

| Param      | Description                         | Type     |
| ---------- | ----------------------------------- | -------- |
| `fact`     | Property name or dot notation path. | `string` |
| `operator` | Name of operator to use.            | `string` |
| `value`    | Value to compare.                   | `any`    |

A `Rule` has shortcut methods for all default operators. Each method takes two arguments (`fact` and `value`) and returns
the `Rule` instance for chaining.

| Method                | Fact Type | Value Type |
| --------------------- | --------- | ---------- |
| `equals`              | `string`  | `any`      |
| `notEquals`           | `string`  | `any`      |
| `in`                  | `string`  | `string`   |
| `notIn`               | `string`  | `string`   |
| `contains`            | `string`  | `any`      |
| `notContains`         | `string`  | `any`      |
| `lessThan`            | `string`  | `number`   |
| `lessThanOrEquals`    | `string`  | `number`   |
| `greaterThan`         | `string`  | `number`   |
| `greaterThanOrEquals` | `string`  | `number`   |

Nested conditions can be achieved with the `and()` / `or()` methods. Each methods takes one parameter, a callback
function that is supplied with a nested `Rule` instance as the first argument, and returns the original `Rule` instance
for chaining.

## Persisting Rules

Rules can easily be converted to JSON and persisted to a database, file system, or elsewhere.

```js
// save rule as JSON string ...
const jsonString = JSON.stringify(rule);
localStorage.setItem('persistedRule', jsonString);
```

```js
// ... and hydrate rules from a JSON object!
const jsonString = localStorage.getItem('persistedRule');
const json = JSON.parse(jsonString);
const rule = new Rule(json);
```

Example JSON structure:

```json
{
  "and": [
    {
      "fact": "homeWorld.name",
      "operator": "equals",
      "value": "Tatooine"
    },
    {
      "or": [
        {
          "fact": "name",
          "operator": "contains",
          "value": "Skywalker"
        },
        {
          "fact": "eyeColor",
          "operator": "equals",
          "value": "green"
        }
      ]
    }
  ]
}
```

# Development

```
npm install
npm run build
```
