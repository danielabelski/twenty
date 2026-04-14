import { parseRRule } from 'src/modules/calendar/calendar-event-import-manager/drivers/utils/parse-rrule.util';

describe('parseRRule', () => {
  it('should return undefined for invalid input', () => {
    expect(parseRRule('')).toBeUndefined();
  });

  it('should parse a weekly rule with BYDAY and UNTIL', () => {
    expect(
      parseRRule('RRULE:FREQ=WEEKLY;BYDAY=FR;UNTIL=20270331T000000Z'),
    ).toBe('every week on Friday until March 31, 2027');
  });

  it('should parse a daily rule with COUNT', () => {
    expect(parseRRule('RRULE:FREQ=DAILY;COUNT=5')).toBe(
      'every day for 5 times',
    );
  });

  it('should parse a weekly rule with multiple days', () => {
    expect(parseRRule('RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR')).toBe(
      'every week on Monday, Wednesday, Friday',
    );
  });

  it('should parse a biweekly rule', () => {
    expect(parseRRule('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH')).toBe(
      'every 2 weeks on Thursday',
    );
  });

  it('should parse a monthly rule with BYMONTHDAY', () => {
    expect(parseRRule('RRULE:FREQ=MONTHLY;BYMONTHDAY=15')).toBe(
      'every month on the 15th',
    );
  });

  it('should parse a monthly rule with ordinal BYDAY', () => {
    expect(parseRRule('RRULE:FREQ=MONTHLY;BYDAY=2TU')).toBe(
      'every month on the 2nd Tuesday',
    );
  });

  it('should parse a yearly rule with BYMONTH and BYMONTHDAY', () => {
    expect(parseRRule('RRULE:FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=1')).toBe(
      'every June on the 1st',
    );
  });

  it('should parse a real Google Calendar weekly recurring event', () => {
    expect(
      parseRRule(
        'RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20270331T133000Z;INTERVAL=1;BYDAY=FR',
      ),
    ).toBe('every week on Friday until March 31, 2027');
  });

  it('should handle RRULE prefix being absent', () => {
    expect(parseRRule('FREQ=WEEKLY;BYDAY=TU')).toBe('every week on Tuesday');
  });
});
