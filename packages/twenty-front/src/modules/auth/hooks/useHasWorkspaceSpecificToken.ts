import { tokenPairState } from '@/auth/states/tokenPairState';
import { isWorkspaceSpecificAccessToken } from '@/auth/utils/isWorkspaceSpecificAccessToken';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const useHasWorkspaceSpecificToken = (): boolean => {
  const tokenPair = useAtomStateValue(tokenPairState);

  if (!tokenPair?.accessOrWorkspaceAgnosticToken?.token) {
    return false;
  }

  return isWorkspaceSpecificAccessToken(
    tokenPair.accessOrWorkspaceAgnosticToken.token,
  );
};
