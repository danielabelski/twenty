import { useCallback, useMemo } from 'react';
import { useStore } from 'jotai';
import { isDefined } from 'twenty-shared/utils';

import { AGENT_CHAT_REFETCH_MESSAGES_EVENT_NAME } from '@/ai/constants/AgentChatRefetchMessagesEventName';
import { AGENT_CHAT_UNKNOWN_THREAD_ID } from '@/ai/constants/AgentChatUnknownThreadId';
import { AGENT_CHAT_NEW_THREAD_DRAFT_KEY } from '@/ai/states/agentChatDraftsByThreadIdState';
import { agentChatInstanceByThreadIdFamilyState } from '@/ai/states/agentChatInstanceByThreadIdFamilyState';
import { agentChatMessagesLoadingState } from '@/ai/states/agentChatMessagesLoadingState';
import { currentAIChatThreadState } from '@/ai/states/currentAIChatThreadState';
import { skipMessagesSkeletonUntilLoadedState } from '@/ai/states/skipMessagesSkeletonUntilLoadedState';
import { mapDBMessagesToUIMessages } from '@/ai/utils/mapDBMessagesToUIMessages';
import { useQueryWithCallbacks } from '@/apollo/hooks/useQueryWithCallbacks';
import { useListenToBrowserEvent } from '@/browser-event/hooks/useListenToBrowserEvent';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import {
  GetChatMessagesDocument,
  type GetChatMessagesQuery,
} from '~/generated-metadata/graphql';

export const AgentChatMessagesFetchEffect = () => {
  const currentAIChatThread = useAtomStateValue(currentAIChatThreadState);
  const store = useStore();

  const isNewThread = useMemo(
    () =>
      currentAIChatThread === AGENT_CHAT_NEW_THREAD_DRAFT_KEY ||
      currentAIChatThread === AGENT_CHAT_UNKNOWN_THREAD_ID,
    [currentAIChatThread],
  );

  const setAgentChatMessagesLoading = useSetAtomState(
    agentChatMessagesLoadingState,
  );

  const setSkipMessagesSkeletonUntilLoaded = useSetAtomState(
    skipMessagesSkeletonUntilLoadedState,
  );

  const handleFirstLoad = useCallback(
    (_data: GetChatMessagesQuery) => {
      setSkipMessagesSkeletonUntilLoaded(false);
    },
    [setSkipMessagesSkeletonUntilLoaded],
  );

  const handleDataLoaded = useCallback(
    (data: GetChatMessagesQuery) => {
      const uiMessages = mapDBMessagesToUIMessages(data.chatMessages ?? []);

      const threadId = store.get(currentAIChatThreadState.atom);

      if (!isDefined(threadId)) {
        return;
      }

      const threadAtom = agentChatInstanceByThreadIdFamilyState.atomFamily({
        threadId,
      });

      const chatInstance = store.get(threadAtom);

      if (chatInstance === null) {
        return;
      }

      const isStreaming =
        chatInstance.status === 'streaming' ||
        chatInstance.status === 'submitted';

      if (isStreaming) {
        return;
      }

      chatInstance.messages = uiMessages;
    },
    [store],
  );

  const handleLoadingChange = useCallback(
    (loading: boolean) => {
      setAgentChatMessagesLoading(loading);
    },
    [setAgentChatMessagesLoading],
  );

  const { refetch: refetchAgentChatMessages } = useQueryWithCallbacks(
    GetChatMessagesDocument,
    {
      variables: { threadId: currentAIChatThread },
      skip: !isDefined(currentAIChatThread) || isNewThread,
      onFirstLoad: handleFirstLoad,
      onDataLoaded: handleDataLoaded,
      onLoadingChange: handleLoadingChange,
    },
  );

  const handleRefetchMessages = useCallback(() => {
    refetchAgentChatMessages();
  }, [refetchAgentChatMessages]);

  useListenToBrowserEvent({
    eventName: AGENT_CHAT_REFETCH_MESSAGES_EVENT_NAME,
    onBrowserEvent: handleRefetchMessages,
  });

  return null;
};
