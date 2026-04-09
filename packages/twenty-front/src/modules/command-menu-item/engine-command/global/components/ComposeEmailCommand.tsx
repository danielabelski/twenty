import { useFirstConnectedAccount } from '@/activities/emails/hooks/useFirstConnectedAccount';
import { useResolveDefaultEmailRecipient } from '@/activities/emails/hooks/useResolveDefaultEmailRecipient';
import { getPrimaryEmailFromRecord } from '@/activities/emails/utils/getPrimaryEmailFromRecord';
import { MAX_EMAIL_RECIPIENTS } from '@/activities/emails/constants/EmailRecipientLimits';
import { HeadlessEngineCommandWrapperEffect } from '@/command-menu-item/engine-command/components/HeadlessEngineCommandWrapperEffect';
import { useHeadlessCommandContextApi } from '@/command-menu-item/engine-command/hooks/useHeadlessCommandContextApi';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useOpenComposeEmailInSidePanel } from '@/side-panel/hooks/useOpenComposeEmailInSidePanel';
import { CoreObjectNameSingular, SettingsPath } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';

export const ComposeEmailCommand = () => {
  const { connectedAccountId, loading: accountLoading } =
    useFirstConnectedAccount();
  const { openComposeEmailInSidePanel } = useOpenComposeEmailInSidePanel();
  const navigateSettings = useNavigateSettings();

  const {
    objectMetadataItem,
    selectedRecords,
    graphqlFilter,
    targetedRecordsRule,
  } = useHeadlessCommandContextApi();

  const objectNameSingular = objectMetadataItem?.nameSingular ?? null;
  const isPerson = objectNameSingular === CoreObjectNameSingular.Person;

  // Bulk means more than one record is selected *or* the user is in
  // exclusion/"select all" mode where selectedRecords is empty but the
  // graphqlFilter encodes the full target set.
  const isBulkPerson =
    isPerson &&
    (selectedRecords.length > 1 || targetedRecordsRule.mode === 'exclusion');

  // For bulk Person selections we fetch emails directly from the server so
  // we always have the data regardless of which columns are visible in the
  // current view. Capped at MAX_EMAIL_RECIPIENTS since the backend will
  // reject anything above that anyway.
  const { records: bulkPersonRecords, loading: bulkLoading } =
    useFindManyRecords({
      objectNameSingular: CoreObjectNameSingular.Person,
      filter: graphqlFilter ?? undefined,
      recordGqlFields: { id: true, emails: { primaryEmail: true } },
      limit: MAX_EMAIL_RECIPIENTS,
      skip: !isBulkPerson,
    });

  // For single-record selection we use the shared resolver which handles
  // the per-object-type fetching (Person, Company, Opportunity).
  const singleSelectedRecordId = !isBulkPerson
    ? (selectedRecords[0]?.id ?? null)
    : null;

  const { defaultTo: singleDefaultTo, loading: recipientLoading } =
    useResolveDefaultEmailRecipient({
      objectNameSingular,
      recordId: singleSelectedRecordId,
    });

  const defaultTo = isBulkPerson
    ? bulkPersonRecords
        .map(getPrimaryEmailFromRecord)
        .filter(isDefined)
        .join(', ')
    : singleDefaultTo;

  const handleExecute = () => {
    if (!isDefined(connectedAccountId)) {
      navigateSettings(SettingsPath.NewAccount);

      return;
    }

    openComposeEmailInSidePanel({
      connectedAccountId,
      defaultTo,
    });
  };

  const ready =
    !accountLoading && (isBulkPerson ? !bulkLoading : !recipientLoading);

  return (
    <HeadlessEngineCommandWrapperEffect execute={handleExecute} ready={ready} />
  );
};
