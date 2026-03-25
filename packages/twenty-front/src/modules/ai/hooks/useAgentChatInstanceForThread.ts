import { Chat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useStore } from 'jotai';
import { type ExtendedUIMessage } from 'twenty-shared/ai';

import { agentChatInstanceByThreadIdFamilyState } from '@/ai/states/agentChatInstanceByThreadIdFamilyState';
import { REST_API_BASE_URL } from '@/apollo/constant/rest-api-base-url';
import { getTokenPair } from '@/apollo/utils/getTokenPair';

type UseAgentChatInstanceForThreadOptions = {
  threadId: string;
  onFinish: (options: { message: ExtendedUIMessage }) => void;
  retryFetchWithRenewedToken: (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => Promise<Response | null>;
};

const createAgentChatInstanceForThread = ({
  threadId,
  onFinish,
  retryFetchWithRenewedToken,
}: UseAgentChatInstanceForThreadOptions): Chat<ExtendedUIMessage> => {
  return new Chat<ExtendedUIMessage>({
    id: threadId,
    messages: [],
    transport: new DefaultChatTransport({
      api: `${REST_API_BASE_URL}/agent-chat/stream`,
      headers: () => ({
        Authorization: `Bearer ${getTokenPair()?.accessOrWorkspaceAgnosticToken.token}`,
      }),
      prepareReconnectToStreamRequest: ({ id }) => ({
        api: `${REST_API_BASE_URL}/agent-chat/${id}/stream`,
        headers: {
          Authorization: `Bearer ${getTokenPair()?.accessOrWorkspaceAgnosticToken.token}`,
        },
      }),
      fetch: async (input, init) => {
        const response = await fetch(input, init);

        if (response.status === 401) {
          const retriedResponse = await retryFetchWithRenewedToken(input, init);

          return retriedResponse ?? response;
        }

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          const error = new Error(
            errorBody.messages?.[0] ||
              `Request failed with status ${response.status}`,
          ) as Error & { code?: string };

          if (errorBody.code !== undefined) {
            error.code = errorBody.code;
          }
          throw error;
        }

        return response;
      },
    }),
    onFinish,
  });
};

export const useAgentChatInstanceForThread = ({
  threadId,
  onFinish,
  retryFetchWithRenewedToken,
}: UseAgentChatInstanceForThreadOptions): {
  agentChatInstanceForThread: Chat<ExtendedUIMessage>;
} => {
  const store = useStore();

  const threadAtom = agentChatInstanceByThreadIdFamilyState.atomFamily({
    threadId,
  });

  const existingInstance = store.get(threadAtom);

  if (existingInstance !== null) {
    return { agentChatInstanceForThread: existingInstance };
  }

  const newInstance = createAgentChatInstanceForThread({
    threadId,
    onFinish,
    retryFetchWithRenewedToken,
  });

  store.set(threadAtom, newInstance);

  return { agentChatInstanceForThread: newInstance };
};
