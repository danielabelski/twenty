import { useContext, useEffect } from 'react';

import { TimelineActivityContext } from '@/activities/timeline-activities/contexts/TimelineActivityContext';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isFieldFilesValue } from '@/object-record/record-field/ui/types/guards/isFieldFilesValue';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';
import { useSetAtomFamilyState } from '@/ui/utilities/state/jotai/hooks/useSetAtomFamilyState';
import { FieldMetadataType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

export const EventFieldDiffValueEffect = ({
  diffArtificialRecordStoreId,
  diffRecord,
  mainObjectMetadataItem,
  fieldMetadataItem,
}: {
  diffArtificialRecordStoreId: string;
  diffRecord: Record<string, any> | undefined;
  mainObjectMetadataItem: EnrichedObjectMetadataItem;
  fieldMetadataItem: FieldMetadataItem;
}) => {
  const setRecordStore = useSetAtomFamilyState(
    recordStoreFamilyState,
    diffArtificialRecordStoreId,
  );

  const { recordId } = useContext(TimelineActivityContext);
  const recordStore = useAtomFamilyStateValue(recordStoreFamilyState, recordId);

  useEffect(() => {
    if (!isDefined(diffRecord)) return;

    let fieldValue = diffRecord;

    if (
      fieldMetadataItem.type === FieldMetadataType.FILES &&
      isDefined(recordStore) &&
      isFieldFilesValue(diffRecord)
    ) {
      const storeValue = recordStore[fieldMetadataItem.name];
      const currentFiles = isFieldFilesValue(storeValue) ? storeValue : [];
      const currentFileMap = new Map(
        currentFiles.map((file) => [file.fileId, file]),
      );

      fieldValue = diffRecord.map((file) => {
        const currentFile = currentFileMap.get(file.fileId);
        if (isDefined(currentFile)) {
          return { ...file, url: currentFile.url };
        }
        return { ...file, isDeleted: true, url: undefined };
      });
    }

    const forgedObjectRecord = {
      __typename: mainObjectMetadataItem.nameSingular,
      id: diffArtificialRecordStoreId,
      [fieldMetadataItem.name]: fieldValue,
    };

    setRecordStore(forgedObjectRecord);
  }, [
    diffRecord,
    diffArtificialRecordStoreId,
    fieldMetadataItem.name,
    fieldMetadataItem.type,
    mainObjectMetadataItem.nameSingular,
    setRecordStore,
    recordStore,
  ]);

  return <></>;
};
