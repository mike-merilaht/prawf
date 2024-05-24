import { COLORS, StringBuilder, UNICODE_CHAR } from './stringBuilder.js';

function is(value) {
  return (eq) => {
    if (value !== eq) {
      throw new Error(`Expected ${value} to be ${eq}`);
    }
  };
}

function getMatchers(value) {
  return {
    is: is(value),
  };
}

export const that = getMatchers;

function testWrapper(test, file, group, name) {
  return () => {
    let passed = false;
    let reason;
    let trace;
    try {
      test();
      passed = true;
    } catch (error) {
      reason = error.message;
    }

    tests[file][group][name] = {
      ...tests[file][group][name],
      state: passed,
      reason,
      trace,
    };
  };
}

/**
 * Register test
 * @param description
 * @param fnc
 */
export function test(description, fnc) {
  const { groupName } = global['ABSCSAEF'];
  const execFile = getFileFromStack();

  if (tests[execFile] == null) {
    tests[execFile] = {};
  }

  if (tests[execFile][groupName] == null) {
    tests[execFile][groupName] = {};
  }

  tests[execFile][groupName][description] = {
    fnc: testWrapper(fnc, execFile, groupName, description),
  };
}

const getStackTrace = function () {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};

function getFileFromStack() {
  const stack = getStackTrace();
  const lines = stack.split('\n');
  for (const line of lines) {
    if (!line.trimStart().startsWith('at file')) {
      continue;
    }

    const x = /test.*.js/g.exec(line);
    return x[0];
  }
}

const tests = {};

/**
 * Register group
 * @param description
 * @param fnc
 */
export function group(description, fnc) {
  const execFile = getFileFromStack();

  if (tests[execFile] == null) {
    tests[execFile] = {};
  }

  if (tests[execFile][description] == null) {
    tests[execFile][description] = {};
  }

  global['ABSCSAEF'] = { groupName: description };

  // Register tests
  fnc();
}

/**
 *
 */
export function exec() {
  const builder = new StringBuilder();
  for (const [file, groups] of Object.entries(tests)) {
    console.log(file);
    for (const [group, assertions] of Object.entries(groups)) {
      console.log(
        builder
          .add(' ')
          .add(UNICODE_CHAR.RIGHT_ARROW)
          .add(' ')
          .add(group)
          .get()
      );

      for (const [test, { fnc }] of Object.entries(assertions)) {
        fnc();
        const { state, reason } = tests[file][group][test];
        builder
          .add(`   ${UNICODE_CHAR.RIGHT_ARROW} [`)
          .add(
            state ? 'PASS' : 'FAIL',
            state ? COLORS.GREEN : COLORS.RED
          )
          .add(`] ${test}`);
        console.log(builder.get());

        if (!state) {
          console.log(`        ${reason}`);
        }
      }
    }
  }
}
