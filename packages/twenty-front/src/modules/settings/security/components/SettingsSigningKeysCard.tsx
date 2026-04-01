/* @license Enterprise */

import { Trans, useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@apollo/client/react';
import { styled } from '@linaria/react';

import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { SettingsEnterpriseFeatureGateCard } from '@/settings/components/SettingsEnterpriseFeatureGateCard';
import { GET_SIGNING_KEYS } from '@/settings/security/graphql/queries/getSigningKeys';
import { ROTATE_SIGNING_KEY } from '@/settings/security/graphql/mutations/rotateSigningKey';
import { RETIRE_SIGNING_KEY } from '@/settings/security/graphql/mutations/retireSigningKey';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { type TagColor } from 'twenty-ui/components';
import { H2Title, IconKey, IconLock } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { Card, Section } from 'twenty-ui/layout';
import { Tag } from 'twenty-ui/components';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type SigningKey = {
  id: string;
  kid: string;
  algorithm: string;
  isActive: boolean;
  hasPrivateKey: boolean;
  createdAt: string;
  rotatedAt: string | null;
  retiredAt: string | null;
};

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[2]} 0;
`;

const StyledKeyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledKid = styled.span`
  font-family: monospace;
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledDate = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledActions = styled.div`
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledRotateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[4]};
`;

const getKeyStatus = (
  key: SigningKey,
): { label: string; color: TagColor } => {
  if (key.retiredAt) {
    return { label: 'Retired', color: 'red' };
  }

  if (key.hasPrivateKey) {
    return { label: 'Active', color: 'green' };
  }

  return { label: 'Rotated', color: 'orange' };
};

export const SettingsSigningKeysCard = () => {
  const { t } = useLingui();
  const { enqueueSuccessSnackBar, enqueueErrorSnackBar } = useSnackBar();
  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const hasEnterpriseAccess = currentWorkspace?.hasValidEnterpriseKey === true;

  const { data, loading, refetch } = useQuery<{
    signingKeys: SigningKey[];
  }>(GET_SIGNING_KEYS, {
    fetchPolicy: 'network-only',
    skip: !hasEnterpriseAccess,
  });

  const [rotateSigningKey, { loading: rotating }] = useMutation(
    ROTATE_SIGNING_KEY,
    {
      onCompleted: () => {
        enqueueSuccessSnackBar({
          message: t`Signing key rotated successfully`,
        });
        refetch();
      },
      onError: (error) => {
        enqueueErrorSnackBar({ message: error.message });
      },
    },
  );

  const [retireSigningKey, { loading: retiring }] = useMutation(
    RETIRE_SIGNING_KEY,
    {
      onCompleted: () => {
        enqueueSuccessSnackBar({
          message: t`Signing key retired successfully`,
        });
        refetch();
      },
      onError: (error) => {
        enqueueErrorSnackBar({ message: error.message });
      },
    },
  );

  const signingKeys: SigningKey[] = data?.signingKeys ?? [];

  return (
    <Section>
      <H2Title
        title={t`Signing Keys`}
        description={t`Manage asymmetric JWT signing keys for enhanced security`}
        adornment={
          <Tag
            text={t`Enterprise`}
            color="transparent"
            Icon={IconLock}
            variant="border"
          />
        }
      />
      {hasEnterpriseAccess ? (
        <Card rounded>
          {!loading && signingKeys.length > 0 && (
            <StyledTable>
              {signingKeys.map((key) => {
                const status = getKeyStatus(key);

                return (
                  <StyledRow key={key.id}>
                    <StyledKeyInfo>
                      <StyledKid>
                        {key.kid} ({key.algorithm})
                      </StyledKid>
                      <StyledDate>
                        <Trans>Created</Trans>{' '}
                        {new Date(key.createdAt).toLocaleDateString()}
                        {key.rotatedAt && (
                          <>
                            {' · '}
                            <Trans>Rotated</Trans>{' '}
                            {new Date(key.rotatedAt).toLocaleDateString()}
                          </>
                        )}
                      </StyledDate>
                    </StyledKeyInfo>
                    <StyledActions>
                      <Tag
                        text={status.label}
                        color={status.color}
                        variant="outline"
                      />
                      {!key.retiredAt && !key.hasPrivateKey && (
                        <Button
                          title={t`Retire`}
                          variant="secondary"
                          size="small"
                          disabled={retiring}
                          onClick={() =>
                            retireSigningKey({
                              variables: { kid: key.kid },
                            })
                          }
                        />
                      )}
                    </StyledActions>
                  </StyledRow>
                );
              })}
            </StyledTable>
          )}
          {!loading && signingKeys.length === 0 && (
            <StyledTable>
              <StyledRow>
                <StyledKeyInfo>
                  <StyledDate>
                    <Trans>
                      No signing keys found. Asymmetric signing may not be
                      enabled.
                    </Trans>
                  </StyledDate>
                </StyledKeyInfo>
              </StyledRow>
            </StyledTable>
          )}
          <StyledRotateContainer>
            <Button
              title={t`Rotate Now`}
              variant="secondary"
              size="small"
              Icon={IconKey}
              disabled={rotating || loading}
              onClick={() => rotateSigningKey()}
            />
          </StyledRotateContainer>
        </Card>
      ) : (
        <SettingsEnterpriseFeatureGateCard
          description={t`Upgrade to Enterprise to manage signing keys.`}
        />
      )}
    </Section>
  );
};
