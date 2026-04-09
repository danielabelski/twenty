export const INBOUND_EMAIL_S3_PREFIXES = {
  incoming: 'inbound-email/incoming/',
  processed: 'inbound-email/processed/',
  unmatched: 'inbound-email/unmatched/',
  failed: 'inbound-email/failed/',
} as const;
