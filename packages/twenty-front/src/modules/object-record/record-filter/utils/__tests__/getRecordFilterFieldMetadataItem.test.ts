import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type RecordFilter } from '@/object-record/record-filter/types/RecordFilter';
import { getRecordFilterFieldMetadataItem } from '@/object-record/record-filter/utils/getRecordFilterFieldMetadataItem';

const mockFieldMetadataItem = {
  id: 'field-1',
  name: 'deletedAt',
  type: 'DATE_TIME',
  label: 'Deleted At',
};

const mockObjectMetadataItems = [
  {
    fields: [mockFieldMetadataItem],
  },
] as unknown as EnrichedObjectMetadataItem[];

const baseRecordFilter: RecordFilter = {
  id: 'filter-1',
  fieldMetadataId: 'field-1',
  value: '',
  displayValue: '',
  type: 'DATE_TIME',
  operand: 'is',
  label: 'Deleted At',
};

describe('getRecordFilterFieldMetadataItem', () => {
  it('should return the field metadata item when found', () => {
    const result = getRecordFilterFieldMetadataItem({
      recordFilter: baseRecordFilter,
      objectMetadataItems: mockObjectMetadataItems,
    });

    expect(result).toEqual(mockFieldMetadataItem);
  });

  it('should return undefined when field metadata id does not exist', () => {
    const result = getRecordFilterFieldMetadataItem({
      recordFilter: {
        ...baseRecordFilter,
        fieldMetadataId: 'non-existent-field-id',
      },
      objectMetadataItems: mockObjectMetadataItems,
    });

    expect(result).toBeUndefined();
  });

  it('should return undefined when object metadata items is empty', () => {
    const result = getRecordFilterFieldMetadataItem({
      recordFilter: baseRecordFilter,
      objectMetadataItems: [],
    });

    expect(result).toBeUndefined();
  });
});
