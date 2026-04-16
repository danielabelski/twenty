import { PERSON_ON_RESEND_EMAIL_ID } from 'src/fields/person-on-resend-email.field';
import { RESEND_EMAIL_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/objects/resend-email';
import { defineField, FieldType, RelationType } from 'twenty-sdk';

export const RESEND_EMAILS_ON_PERSON_ID =
  'c6142228-e0e4-4143-9942-df4fce3ef231';

export default defineField({
  universalIdentifier: RESEND_EMAILS_ON_PERSON_ID,
  objectUniversalIdentifier: '20202020-e674-48e5-a542-72570eee7213',
  type: FieldType.RELATION,
  name: 'resendEmails',
  label: 'Resend Emails',
  relationTargetObjectMetadataUniversalIdentifier:
    RESEND_EMAIL_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier: PERSON_ON_RESEND_EMAIL_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
