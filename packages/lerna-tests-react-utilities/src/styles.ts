import classnames = require('classnames');

export const classNames = classnames as any;

export function variationName(name: string, value: string | number) {
  const valuePortion =
    typeof value === 'number'
      ? String(value)
      : `${value[0].toUpperCase()}${value.substring(1)}`;
  return `${name}${valuePortion}`;
}
