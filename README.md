# prawf

/prau̯v/

noun: (welsh) proof

A simple Javascript testing library.

## Why?

Because I wanted to try and make one.

## Example

### Equality
```javascript
import { group, test, that } from 'prawf';
import { sum } from './sum.js';

group('sum', () => {
  test('1 + 1 = 2', () => {
    that(sum(1, 1)).is(2);
  });
});
```

## Should I use it?

At your own risk.

## Can I contribute?

Sure!