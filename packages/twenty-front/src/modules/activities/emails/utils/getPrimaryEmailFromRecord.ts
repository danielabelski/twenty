import { isNonEmptyString } from '@sniptt/guards';

import { isFieldEmailsValue } from '@/object-record/record-field/ui/types/guards/isFieldEmailsValue';

export const getPrimaryEmailFromRecord = (
  record: Record<string, unknown>,
): string | null => {
  const emails = record.emails;

  if (!isFieldEmailsValue(emails)) {
    return null;
  }

  if (isNonEmptyString(emails.primaryEmail)) {
    return emails.primaryEmail;
  }

  return null;
};
