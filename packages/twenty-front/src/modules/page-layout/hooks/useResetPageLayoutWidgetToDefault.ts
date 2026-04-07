import { useExitLayoutCustomizationMode } from '@/layout-customization/hooks/useExitLayoutCustomizationMode';
import { useMetadataErrorHandler } from '@/metadata-error-handler/hooks/useMetadataErrorHandler';
import { useInvalidateMetadataStore } from '@/metadata-store/hooks/useInvalidateMetadataStore';
import { useSetIsPageLayoutInEditMode } from '@/page-layout/hooks/useSetIsPageLayoutInEditMode';
import { PageLayoutComponentInstanceContext } from '@/page-layout/states/contexts/PageLayoutComponentInstanceContext';
import { fieldsWidgetEditorModeDraftComponentState } from '@/page-layout/states/fieldsWidgetEditorModeDraftComponentState';
import { fieldsWidgetEditorModePersistedComponentState } from '@/page-layout/states/fieldsWidgetEditorModePersistedComponentState';
import { fieldsWidgetGroupsDraftComponentState } from '@/page-layout/states/fieldsWidgetGroupsDraftComponentState';
import { fieldsWidgetGroupsPersistedComponentState } from '@/page-layout/states/fieldsWidgetGroupsPersistedComponentState';
import { fieldsWidgetUngroupedFieldsDraftComponentState } from '@/page-layout/states/fieldsWidgetUngroupedFieldsDraftComponentState';
import { fieldsWidgetUngroupedFieldsPersistedComponentState } from '@/page-layout/states/fieldsWidgetUngroupedFieldsPersistedComponentState';
import { hasInitializedFieldsWidgetGroupsDraftComponentState } from '@/page-layout/states/hasInitializedFieldsWidgetGroupsDraftComponentState';
import { pageLayoutIsInitializedComponentState } from '@/page-layout/states/pageLayoutIsInitializedComponentState';
import { useSidePanelMenu } from '@/side-panel/hooks/useSidePanelMenu';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useAvailableComponentInstanceIdOrThrow } from '@/ui/utilities/state/component-state/hooks/useAvailableComponentInstanceIdOrThrow';
import { useAtomComponentStateCallbackState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateCallbackState';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useMutation } from '@apollo/client/react';
import { t } from '@lingui/core/macro';
import { useStore } from 'jotai';
import { useCallback } from 'react';
import { CrudOperationType } from 'twenty-shared/types';
import { ResetPageLayoutWidgetToDefaultDocument } from '~/generated-metadata/graphql';

export const useResetPageLayoutWidgetToDefault = (
  pageLayoutIdFromProps?: string,
) => {
  const pageLayoutId = useAvailableComponentInstanceIdOrThrow(
    PageLayoutComponentInstanceContext,
    pageLayoutIdFromProps,
  );

  const [resetMutation] = useMutation(ResetPageLayoutWidgetToDefaultDocument);

  const { handleMetadataError } = useMetadataErrorHandler();
  const { enqueueErrorSnackBar } = useSnackBar();
  const { exitLayoutCustomizationMode } = useExitLayoutCustomizationMode();
  const { invalidateMetadataStore } = useInvalidateMetadataStore();
  const { setIsPageLayoutInEditMode } =
    useSetIsPageLayoutInEditMode(pageLayoutId);
  const { closeSidePanelMenu } = useSidePanelMenu();
  const { invalidateMetadataStore } = useInvalidateMetadataStore();

  const store = useStore();

  const hasInitializedState = useAtomComponentStateCallbackState(
    hasInitializedFieldsWidgetGroupsDraftComponentState,
    pageLayoutId,
  );

  const groupsDraftState = useAtomComponentStateCallbackState(
    fieldsWidgetGroupsDraftComponentState,
    pageLayoutId,
  );

  const groupsPersistedState = useAtomComponentStateCallbackState(
    fieldsWidgetGroupsPersistedComponentState,
    pageLayoutId,
  );

  const ungroupedDraftState = useAtomComponentStateCallbackState(
    fieldsWidgetUngroupedFieldsDraftComponentState,
    pageLayoutId,
  );

  const ungroupedPersistedState = useAtomComponentStateCallbackState(
    fieldsWidgetUngroupedFieldsPersistedComponentState,
    pageLayoutId,
  );

  const editorModeDraftState = useAtomComponentStateCallbackState(
    fieldsWidgetEditorModeDraftComponentState,
    pageLayoutId,
  );

  const editorModePersistedState = useAtomComponentStateCallbackState(
    fieldsWidgetEditorModePersistedComponentState,
    pageLayoutId,
  );

  const pageLayoutIsInitializedState = useAtomComponentStateCallbackState(
    pageLayoutIsInitializedComponentState,
    pageLayoutId,
  );

  const clearWidgetDraftState = useCallback(
    (widgetId: string) => {
      const removeWidgetEntry = <T>(prev: Record<string, T>) => {
        const { [widgetId]: _, ...rest } = prev;

        return rest;
      };

      store.set(hasInitializedState, removeWidgetEntry);
      store.set(groupsDraftState, removeWidgetEntry);
      store.set(groupsPersistedState, removeWidgetEntry);
      store.set(ungroupedDraftState, removeWidgetEntry);
      store.set(ungroupedPersistedState, removeWidgetEntry);
      store.set(editorModeDraftState, removeWidgetEntry);
      store.set(editorModePersistedState, removeWidgetEntry);
    },
    [
      store,
      hasInitializedState,
      groupsDraftState,
      groupsPersistedState,
      ungroupedDraftState,
      ungroupedPersistedState,
      editorModeDraftState,
      editorModePersistedState,
    ],
  );

  const resetPageLayoutWidgetToDefault = useCallback(
    async (widgetId: string) => {
      try {
        await resetMutation({
          variables: { id: widgetId },
        });

        exitLayoutCustomizationMode();
        clearWidgetDraftState(widgetId);
        setIsPageLayoutInEditMode(false);
        store.set(pageLayoutIsInitializedState, false);
        closeSidePanelMenu();
        invalidateMetadataStore();
      } catch (error) {
        if (CombinedGraphQLErrors.is(error)) {
          handleMetadataError(error, {
            primaryMetadataName: 'pageLayoutWidget',
            operationType: CrudOperationType.UPDATE,
          });
        } else {
          enqueueErrorSnackBar({ message: t`An error occurred.` });
        }
      }
    },
    [
      resetMutation,
      exitLayoutCustomizationMode,
      clearWidgetDraftState,
      setIsPageLayoutInEditMode,
      closeSidePanelMenu,
      clearWidgetDraftState,
      invalidateMetadataStore,
      handleMetadataError,
      enqueueErrorSnackBar,
    ],
  );

  return { resetPageLayoutWidgetToDefault };
};
