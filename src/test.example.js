import { group, test, that } from './prawf.js';
import { sum } from '../examples/methods.js'

group('sum', () => {
  test('1 + 1 = 2', () => {
    that(sum(1, 1)).is(2);
  })
  test('1 + 2 = 4 [I SHOULD FAIL]', () => {
    that(sum(1, 2)).is(4)
  })
})

group('sum2', () => {
  test('4 + 6 = 10', () => {
    that(sum(4, 6)).is(10)
  })
})