import { type Chat } from '@ai-sdk/react';
import { type ExtendedUIMessage } from 'twenty-shared/ai';

import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';

export const agentChatInstanceByThreadIdFamilyState = createAtomFamilyState<
  Chat<ExtendedUIMessage> | null,
  { threadId: string }
>({
  key: 'agentChatInstanceByThreadIdFamilyState',
  defaultValue: null,
});
