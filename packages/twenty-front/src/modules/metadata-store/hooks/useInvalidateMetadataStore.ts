import { metadataLoadedVersionState } from '@/metadata-store/states/metadataLoadedVersionState';
import {
  ALL_METADATA_ENTITY_KEYS,
  metadataStoreState,
} from '@/metadata-store/states/metadataStoreState';
import { useStore } from 'jotai';
import { useCallback } from 'react';

export const useInvalidateMetadataStore = () => {
  const store = useStore();

  const invalidateMetadataStore = useCallback(() => {
    for (const key of ALL_METADATA_ENTITY_KEYS) {
      store.set(metadataStoreState.atomFamily(key), (prev) => ({
        ...prev,
        currentCollectionHash: undefined,
      }));
    }
    store.set(metadataLoadedVersionState.atom, (prev) => prev + 1);
  }, [store]);

  // Resets statuses to 'empty' so isMinimalMetadataReady becomes false
  // and loadMinimalMetadata writes fresh server data. Use during login
  // flows where stale localStorage metadata must not gate rendering.
  const resetMetadataStore = useCallback(() => {
    for (const key of ALL_METADATA_ENTITY_KEYS) {
      store.set(metadataStoreState.atomFamily(key), (prev) => ({
        ...prev,
        status: 'empty',
        currentCollectionHash: undefined,
      }));
    }
    store.set(metadataLoadedVersionState.atom, (prev) => prev + 1);
  }, [store]);

  return { invalidateMetadataStore, resetMetadataStore };
};
