import { t } from '@lingui/core/macro';
import {
  type Application,
  FindOneApplicationDocument,
} from '~/generated-metadata/graphql';
import { useUpdateOneApplicationVariable } from '~/pages/settings/applications/hooks/useUpdateOneApplicationVariable';
import { SettingsApplicationDetailEnvironmentVariablesTable } from '~/pages/settings/applications/tabs/SettingsApplicationDetailEnvironmentVariablesTable';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useApolloClient } from '@apollo/client/react';

export const SettingsApplicationDetailSettingsTab = ({
  application,
}: {
  application?: Pick<
    Application,
    'applicationVariables' | 'id' | 'universalIdentifier' | 'canBeUninstalled'
  >;
}) => {
  const { updateOneApplicationVariable } = useUpdateOneApplicationVariable();
  const { enqueueSuccessSnackBar, enqueueErrorSnackBar } = useSnackBar();
  const apolloClient = useApolloClient();

  const envVariables = [...(application?.applicationVariables ?? [])].sort(
    (a, b) => a.key.localeCompare(b.key),
  );

  return (
    <SettingsApplicationDetailEnvironmentVariablesTable
      envVariables={envVariables}
      onSave={async ({ key, value }) => {
        if (!application?.id) {
          return;
        }

        try {
          await updateOneApplicationVariable({
            key,
            value,
            applicationId: application.id,
          });
          await apolloClient.refetchQueries({
            include: [FindOneApplicationDocument],
          });
          enqueueSuccessSnackBar({
            message: t`Variable ${key} updated`,
          });
        } catch {
          enqueueErrorSnackBar({
            message: t`Error updating variable`,
          });
          throw new Error(t`Error updating variable`);
        }
      }}
    />
  );
};
