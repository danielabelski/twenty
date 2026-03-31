import { normalizeTimezone } from 'twenty-shared/utils';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const useUserTimezone = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const systemTimeZone = normalizeTimezone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const userTimezone = normalizeTimezone(
    currentWorkspaceMember?.timeZone !== 'system'
      ? (currentWorkspaceMember?.timeZone ?? systemTimeZone)
      : systemTimeZone,
  );

  const isSystemTimezone = userTimezone === systemTimeZone;

  return {
    userTimezone,
    isSystemTimezone,
    systemTimeZone,
  };
};
