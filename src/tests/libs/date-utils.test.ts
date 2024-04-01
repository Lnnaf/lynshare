import { isEnoughDaysPassed } from '../../lib/date-utils';
import { describe, expect, it } from '@jest/globals';

describe('isEnoughDaysPassed', () => {
  it('should return true if enough days have passed', () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (31 * 24 * 60 * 60 * 1000)); // 31 days ago
    expect(isEnoughDaysPassed(pastDate)).toBe(true);
  });

  it('should return false if not enough days have passed', () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (29 * 24 * 60 * 60 * 1000)); // 29 days ago
    expect(isEnoughDaysPassed(pastDate)).toBe(false);
  });

  it('should return true if enough custom days have passed', () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (15 * 24 * 60 * 60 * 1000)); // 15 days ago
    expect(isEnoughDaysPassed(pastDate, 10)).toBe(true);
  });

  it('should return false if not enough custom days have passed', () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (5 * 24 * 60 * 60 * 1000)); // 5 days ago
    expect(isEnoughDaysPassed(pastDate, 10)).toBe(false);
  });
});