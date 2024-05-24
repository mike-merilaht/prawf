import { group, test, that } from '../src/prawf.js';
import { StringBuilder } from '../src/stringBuilder.js';

group('StringBuilder', () => {
  test('can create basic string', () => {
    const builder = new StringBuilder();
    builder.add('ABC');
    that(builder.get()).is('ABC');
  });

  test('content is wiped after get', () => {
    const builder = new StringBuilder();
    builder.add('ABC');
    builder.get();
    that(builder.get()).is('')
  });

  test('that builder is chainable', () => {
    const builder = new StringBuilder();
    builder.add('ABC').add('DEF').add('123');
    that(builder.get()).is('ABCDEF123');
  })
});