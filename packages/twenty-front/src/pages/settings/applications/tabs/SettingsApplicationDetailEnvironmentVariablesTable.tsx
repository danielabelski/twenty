import { type ApplicationVariable } from '~/generated-metadata/graphql';
import { t } from '@lingui/core/macro';
import { H2Title, IconCheck } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { Section } from 'twenty-ui/layout';
import { TextInput } from '@/ui/input/components/TextInput';
import { useState } from 'react';
import { styled } from '@linaria/react';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { isNonEmptyString } from '@sniptt/guards';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
`;

const StyledVariableRow = styled.div`
  align-items: flex-end;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledInputContainer = styled.div`
  flex: 1;
`;

export const SettingsApplicationDetailEnvironmentVariablesTable = ({
  envVariables,
  onSave,
}: {
  envVariables: ApplicationVariable[];
  onSave: (newEnv: Pick<ApplicationVariable, 'key' | 'value'>) => Promise<void>;
}) => {
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savingKeys, setSavingKeys] = useState<Record<string, boolean>>({});

  const handleSave = async (envVariable: ApplicationVariable) => {
    const newValue = editedValues[envVariable.key];

    if (!isNonEmptyString(newValue)) {
      return;
    }

    setSavingKeys((previous) => ({ ...previous, [envVariable.key]: true }));

    try {
      await onSave({ key: envVariable.key, value: newValue });
      setEditedValues((previous) => {
        const next = { ...previous };

        delete next[envVariable.key];

        return next;
      });
    } finally {
      setSavingKeys((previous) => ({ ...previous, [envVariable.key]: false }));
    }
  };

  const description =
    envVariables.length > 0
      ? t`Set your application configuration variables`
      : t`No variables to set for this application`;

  return (
    <Section>
      <H2Title title={t`Configuration`} description={description} />
      <StyledContainer>
        {envVariables.map((envVariable) => {
          const isDirty = isNonEmptyString(editedValues[envVariable.key]);
          const isSaving = savingKeys[envVariable.key] ?? false;

          return (
            <StyledVariableRow key={envVariable.key}>
              <StyledInputContainer>
                <TextInput
                  label={envVariable.key}
                  value={editedValues[envVariable.key] ?? ''}
                  onChange={(newValue) => {
                    setEditedValues((previous) => ({
                      ...previous,
                      [envVariable.key]: newValue,
                    }));
                  }}
                  placeholder={envVariable.value || t`Value`}
                  fullWidth
                />
              </StyledInputContainer>
              <Button
                Icon={IconCheck}
                variant="secondary"
                size="small"
                disabled={!isDirty || isSaving}
                onClick={() => handleSave(envVariable)}
              />
            </StyledVariableRow>
          );
        })}
      </StyledContainer>
    </Section>
  );
};
