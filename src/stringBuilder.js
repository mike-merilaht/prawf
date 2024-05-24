export const COLORS = {
  RED: '31',
  GREEN: '32',
  YELLOW: '33'
};

export const UNICODE_CHAR = {
  RIGHT_ARROW: '\u2192'
};

export class StringBuilder {
  #parts = []

  add(text, color) {
    const string = `${text}`;
    if (!color) {
      this.#parts.push(string);
      return this;
    }

    this.#parts.push(`\x1b[${color}m`, string, '\x1b[0m');
    return this;
  }

  get() {
    const string = this.#parts.join('');
    this.#parts = [];
    return string;
  }
}