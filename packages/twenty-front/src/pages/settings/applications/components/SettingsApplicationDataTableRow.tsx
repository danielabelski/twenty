import { SettingsItemTypeTag } from '@/settings/components/SettingsItemTypeTag';
import {
  StyledActionTableCell,
  StyledNameTableCell,
} from '@/settings/data-model/object-details/components/SettingsObjectItemTableRowStyledComponents';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useContext } from 'react';
import { isDefined } from 'twenty-shared/utils';
import {
  IconChevronRight,
  useIcons,
  OverflowingTextWithTooltip,
} from 'twenty-ui/display';
import { ThemeContext } from 'twenty-ui/theme-constants';

import { type ApplicationDataTableRow } from '~/pages/settings/applications/components/SettingsApplicationDataTable';
import { styled } from '@linaria/react';

const MAIN_ROW_GRID_COLUMNS = '180px 1fr 98.7px 36px';

const StyledIconWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const SettingsApplicationDataTableRow = ({
  row,
}: {
  row: ApplicationDataTableRow;
}) => {
  const { theme } = useContext(ThemeContext);
  const { getIcon } = useIcons();

  const Icon = getIcon(row.icon);

  return (
    <TableRow gridAutoColumns={MAIN_ROW_GRID_COLUMNS} to={row.link}>
      <StyledNameTableCell>
        {isDefined(Icon) && (
          <StyledIconWrapper>
            <Icon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
          </StyledIconWrapper>
        )}
        <OverflowingTextWithTooltip text={row.labelPlural} />
      </StyledNameTableCell>
      <TableCell>
        <SettingsItemTypeTag item={row.tagItem} />
      </TableCell>
      <TableCell align="right">{row.fieldsCount}</TableCell>
      <StyledActionTableCell>
        <IconChevronRight
          size={theme.icon.size.md}
          stroke={theme.icon.stroke.sm}
          color={theme.font.color.tertiary}
        />
      </StyledActionTableCell>
    </TableRow>
  );
};
