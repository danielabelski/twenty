import { useStore } from 'jotai';
import { useCallback, useState } from 'react';
import { type ExtendedUIMessage } from 'twenty-shared/ai';
import { isDefined, isValidUuid } from 'twenty-shared/utils';
import { v4 } from 'uuid';

import { AGENT_CHAT_INSTANCE_ID } from '@/ai/constants/AgentChatInstanceId';
import { AGENT_CHAT_REFETCH_MESSAGES_EVENT_NAME } from '@/ai/constants/AgentChatRefetchMessagesEventName';
import { AGENT_CHAT_SEND_MESSAGE_EVENT_NAME } from '@/ai/constants/AgentChatSendMessageEventName';
import { AGENT_CHAT_STOP_EVENT_NAME } from '@/ai/constants/AgentChatStopEventName';
import {
  AGENT_CHAT_NEW_THREAD_DRAFT_KEY,
  agentChatDraftsByThreadIdState,
} from '@/ai/states/agentChatDraftsByThreadIdState';
import { agentChatInputState } from '@/ai/states/agentChatInputState';
import { agentChatSelectedFilesState } from '@/ai/states/agentChatSelectedFilesState';
import { agentChatUploadedFilesState } from '@/ai/states/agentChatUploadedFilesState';
import { agentChatMessagesComponentFamilyState } from '@/ai/states/agentChatMessagesComponentFamilyState';
import { currentAIChatThreadState } from '@/ai/states/currentAIChatThreadState';
import { useGetBrowsingContext } from '@/ai/hooks/useBrowsingContext';
import { useAgentChatModelId } from '@/ai/hooks/useAgentChatModelId';
import { useAuthenticatedAgentChatFetch } from '@/ai/hooks/useAuthenticatedAgentChatFetch';
import { useListenToBrowserEvent } from '@/browser-event/hooks/useListenToBrowserEvent';
import { dispatchBrowserEvent } from '@/browser-event/utils/dispatchBrowserEvent';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';

export const useAgentChat = (
  ensureThreadIdForSend: () => Promise<string | null>,
) => {
  const { modelIdForRequest } = useAgentChatModelId();
  const { getBrowsingContext } = useGetBrowsingContext();
  const { authenticatedFetch } = useAuthenticatedAgentChatFetch();
  const setCurrentAIChatThread = useSetAtomState(currentAIChatThreadState);
  const store = useStore();

  const agentChatSelectedFiles = useAtomStateValue(agentChatSelectedFilesState);

  const [, setPendingThreadIdAfterFirstSend] = useState<string | null>(null);

  const [agentChatUploadedFiles, setAgentChatUploadedFiles] = useAtomState(
    agentChatUploadedFilesState,
  );

  const [, setAgentChatInput] = useAtomState(agentChatInputState);
  const setAgentChatDraftsByThreadId = useSetAtomState(
    agentChatDraftsByThreadIdState,
  );

  const handleSendMessage = useCallback(async () => {
    const draftKey =
      store.get(currentAIChatThreadState.atom) ??
      AGENT_CHAT_NEW_THREAD_DRAFT_KEY;
    const contentToSend =
      draftKey === AGENT_CHAT_NEW_THREAD_DRAFT_KEY
        ? (
            store.get(agentChatDraftsByThreadIdState.atom)[
              AGENT_CHAT_NEW_THREAD_DRAFT_KEY
            ] ?? store.get(agentChatInputState.atom)
          ).trim()
        : store.get(agentChatInputState.atom).trim();

    if (contentToSend === '') {
      return;
    }

    const isLoading = agentChatSelectedFiles.length > 0;

    if (isLoading) {
      return;
    }

    const threadId = await ensureThreadIdForSend();

    if (!isDefined(threadId)) {
      return;
    }

    if (draftKey === AGENT_CHAT_NEW_THREAD_DRAFT_KEY) {
      setPendingThreadIdAfterFirstSend(threadId);
    }

    setAgentChatInput('');
    setAgentChatDraftsByThreadId((prev) => ({
      ...prev,
      [draftKey]: '',
    }));

    const browsingContext = getBrowsingContext();

    // Optimistic user message — always placed in the main messages atom.
    // The next REFETCH_MESSAGES event will reconcile with server state,
    // moving it to the queued list if the server queued it.
    const optimisticUserMessage: ExtendedUIMessage = {
      id: v4(),
      role: 'user',
      parts: [
        { type: 'text' as const, text: contentToSend },
        ...agentChatUploadedFiles,
      ],
      metadata: {
        createdAt: new Date().toISOString(),
      },
      status: 'sent',
    };

    const atomKey = {
      instanceId: AGENT_CHAT_INSTANCE_ID,
      familyKey: { threadId },
    };

    const currentMessages = store.get(
      agentChatMessagesComponentFamilyState.atomFamily(atomKey),
    );

    store.set(agentChatMessagesComponentFamilyState.atomFamily(atomKey), [
      ...currentMessages,
      optimisticUserMessage,
    ]);

    setAgentChatUploadedFiles([]);

    try {
      const response = await authenticatedFetch(
        `/agent-chat/${threadId}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: contentToSend,
            browsingContext,
            ...(isDefined(modelIdForRequest) && {
              modelId: modelIdForRequest,
            }),
          }),
        },
      );

      if (!response?.ok) {
        throw new Error('Failed to send message');
      }

      const responseBody = await response.json();

      // If the server queued the message (stream was active), remove the
      // optimistic entry from the main conversation — the refetch below will
      // place it in the dedicated queue list instead.
      if (responseBody.queued) {
        const latestMessages = store.get(
          agentChatMessagesComponentFamilyState.atomFamily(atomKey),
        );

        store.set(
          agentChatMessagesComponentFamilyState.atomFamily(atomKey),
          latestMessages.filter(
            (message) => message.id !== optimisticUserMessage.id,
          ),
        );
      }

      dispatchBrowserEvent(AGENT_CHAT_REFETCH_MESSAGES_EVENT_NAME);

      setPendingThreadIdAfterFirstSend((pendingId) => {
        if (isDefined(pendingId)) {
          setCurrentAIChatThread(pendingId);
        }

        return null;
      });
    } catch {
      const latestMessages = store.get(
        agentChatMessagesComponentFamilyState.atomFamily(atomKey),
      );

      store.set(
        agentChatMessagesComponentFamilyState.atomFamily(atomKey),
        latestMessages.filter(
          (message) => message.id !== optimisticUserMessage.id,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    store,
    agentChatSelectedFiles,
    ensureThreadIdForSend,
    setAgentChatInput,
    getBrowsingContext,
    agentChatUploadedFiles,
    setAgentChatUploadedFiles,
    setAgentChatDraftsByThreadId,
    modelIdForRequest,
    setCurrentAIChatThread,
    authenticatedFetch,
  ]);

  useListenToBrowserEvent({
    eventName: AGENT_CHAT_SEND_MESSAGE_EVENT_NAME,
    onBrowserEvent: handleSendMessage,
  });

  const handleStop = useCallback(async () => {
    const threadId = store.get(currentAIChatThreadState.atom);

    if (!isDefined(threadId) || !isValidUuid(threadId)) {
      return;
    }

    authenticatedFetch(`/agent-chat/${threadId}/stream`, {
      method: 'DELETE',
    }).catch(() => {});
  }, [store, authenticatedFetch]);

  useListenToBrowserEvent({
    eventName: AGENT_CHAT_STOP_EVENT_NAME,
    onBrowserEvent: handleStop,
  });

  return {
    handleSendMessage,
    handleStop,
  };
};
