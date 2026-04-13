import { relativeDateFilterStringifiedSchema } from '@/utils/filter/dates/utils/relativeDateFilterStringifiedSchema';
import { resolveRelativeDateTimeFilter } from '@/utils/filter/dates/utils/resolveRelativeDateTimeFilter';
import { safeParseRelativeDateFilterJSONStringified } from '@/utils/safeParseRelativeDateFilterJSONStringified';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'class-validator';
import { Temporal } from 'temporal-polyfill';

export const resolveRelativeDateTimeFilterStringified = (
  relativeDateTimeFilterStringified: string | null | undefined,
) => {
  if (!isNonEmptyString(relativeDateTimeFilterStringified)) {
    return null;
  }

  const relativeDateFilterParseResult =
    relativeDateFilterStringifiedSchema.safeParse(
      relativeDateTimeFilterStringified,
    );

  const relativeDateFilter = relativeDateFilterParseResult.success
    ? relativeDateFilterParseResult.data
    : safeParseRelativeDateFilterJSONStringified(
        relativeDateTimeFilterStringified,
      );

  if (!isDefined(relativeDateFilter)) {
    return null;
  }

  const referenceTodayZonedDateTime = isDefined(relativeDateFilter.timezone)
    ? Temporal.Now.zonedDateTimeISO(relativeDateFilter.timezone)
    : Temporal.Now.zonedDateTimeISO();

  const relativeDateFilterWithDateRange = resolveRelativeDateTimeFilter(
    relativeDateFilter,
    referenceTodayZonedDateTime.round({ smallestUnit: 'second' }),
  );

  return relativeDateFilterWithDateRange;
};
