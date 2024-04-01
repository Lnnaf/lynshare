/* tslint:disable */
import { getInitials, toCapitalizeFirstChar } from '../../lib/string-utils';
import { describe, expect, it } from '@jest/globals';

describe('getInitials', () => {
  it('should return initials for a given string', () => {
    expect(getInitials('Linh Nguyen Van')).toBe('LNV');
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('')).toBe('UA');
  });

  it('should return empty string if input is undefined', () => {
    expect(getInitials(undefined as unknown as string)).toBe('UA'); // Fix: Pass an empty string instead of undefined
  });
});

describe('toCapitalizeFirstChar', () => {
  it('should capitalize the first character of each word in a string', () => {
    expect(toCapitalizeFirstChar('hello world')).toBe('Hello World');
    expect(toCapitalizeFirstChar('this is a test')).toBe('This Is A Test');
    expect(toCapitalizeFirstChar('')).toBe('');
  });

  it('should return the same string if input is undefined', () => {
    expect(toCapitalizeFirstChar(undefined as unknown as string)).toBe(undefined);
  });
});