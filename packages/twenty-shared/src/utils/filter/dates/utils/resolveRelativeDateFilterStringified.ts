import { relativeDateFilterStringifiedSchema } from '@/utils/filter/dates/utils/relativeDateFilterStringifiedSchema';
import { resolveRelativeDateFilter } from '@/utils/filter/dates/utils/resolveRelativeDateFilter';
import { safeParseRelativeDateFilterJSONStringified } from '@/utils/safeParseRelativeDateFilterJSONStringified';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'class-validator';
import { Temporal } from 'temporal-polyfill';

export const resolveRelativeDateFilterStringified = (
  relativeDateFilterStringified?: string | null,
) => {
  if (!isNonEmptyString(relativeDateFilterStringified)) {
    return null;
  }

  const relativeDateFilterParseResult =
    relativeDateFilterStringifiedSchema.safeParse(
      relativeDateFilterStringified,
    );

  const relativeDateFilter = relativeDateFilterParseResult.success
    ? relativeDateFilterParseResult.data
    : safeParseRelativeDateFilterJSONStringified(relativeDateFilterStringified);

  if (!isDefined(relativeDateFilter)) {
    return null;
  }

  const referenceTodayZonedDateTime = isDefined(relativeDateFilter.timezone)
    ? Temporal.Now.zonedDateTimeISO(relativeDateFilter.timezone)
    : Temporal.Now.zonedDateTimeISO();

  const relativeDateFilterWithDateRange = resolveRelativeDateFilter(
    relativeDateFilter,
    referenceTodayZonedDateTime,
  );

  return relativeDateFilterWithDateRange;
};
