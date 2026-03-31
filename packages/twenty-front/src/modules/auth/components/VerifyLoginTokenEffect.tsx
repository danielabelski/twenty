import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppPath } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { useHasAccessTokenPair } from '@/auth/hooks/useHasAccessTokenPair';
import { useVerifyLogin } from '@/auth/hooks/useVerifyLogin';
import { tokenPairState } from '@/auth/states/tokenPairState';
import { useInvalidateMetadataStore } from '@/metadata-store/hooks/useInvalidateMetadataStore';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { useNavigateApp } from '~/hooks/useNavigateApp';

export const VerifyLoginTokenEffect = () => {
  const [searchParams] = useSearchParams();
  const loginToken = searchParams.get('loginToken');

  const hasAccessTokenPair = useHasAccessTokenPair();
  const navigate = useNavigateApp();
  const setTokenPair = useSetAtomState(tokenPairState);
  const { verifyLoginToken } = useVerifyLogin();
  const { resetMetadataStore } = useInvalidateMetadataStore();

  useEffect(() => {
    if (isDefined(loginToken)) {
      resetMetadataStore();
      setTokenPair(null);
      verifyLoginToken(loginToken);
    } else if (!hasAccessTokenPair) {
      navigate(AppPath.SignInUp);
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
