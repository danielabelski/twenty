import { normalizeTimezone } from '../normalizeTimezone';

describe('normalizeTimezone', () => {
  it('should normalize deprecated timezone names to canonical equivalents', () => {
    expect(normalizeTimezone('Asia/Calcutta')).toBe('Asia/Kolkata');
    expect(normalizeTimezone('US/Eastern')).toBe('America/New_York');
    expect(normalizeTimezone('Asia/Saigon')).toBe('Asia/Ho_Chi_Minh');
    expect(normalizeTimezone('Europe/Kiev')).toBe('Europe/Kyiv');
    expect(normalizeTimezone('Canada/Eastern')).toBe('America/Toronto');
  });

  it('should return canonical timezone names unchanged', () => {
    expect(normalizeTimezone('Asia/Kolkata')).toBe('Asia/Kolkata');
    expect(normalizeTimezone('America/New_York')).toBe('America/New_York');
    expect(normalizeTimezone('Europe/Paris')).toBe('Europe/Paris');
    expect(normalizeTimezone('UTC')).toBe('UTC');
  });

  it('should return unknown timezone names unchanged', () => {
    expect(normalizeTimezone('Not/A/Timezone')).toBe('Not/A/Timezone');
    expect(normalizeTimezone('invalid')).toBe('invalid');
  });
});
