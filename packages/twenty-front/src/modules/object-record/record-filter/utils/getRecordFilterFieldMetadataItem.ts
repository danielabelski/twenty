import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { type RecordFilter } from '@/object-record/record-filter/types/RecordFilter';

export const getRecordFilterFieldMetadataItem = ({
  recordFilter,
  objectMetadataItems,
}: {
  recordFilter: RecordFilter;
  objectMetadataItems: EnrichedObjectMetadataItem[];
}): FieldMetadataItem | undefined => {
  const allFieldMetadataItems = objectMetadataItems.flatMap(
    (objectMetadataItem) => objectMetadataItem.fields,
  );

  return allFieldMetadataItems.find(
    (fieldMetadataItem) =>
      fieldMetadataItem.id === recordFilter.fieldMetadataId,
  );
};
