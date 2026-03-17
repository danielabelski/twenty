import { SettingsBillingLabelValueItem } from '@/billing/components/internal/SettingsBillingLabelValueItem';
import { SubscriptionInfoContainer } from '@/billing/components/SubscriptionInfoContainer';
import { useNumberFormat } from '@/localization/hooks/useNumberFormat';
import { CHART_MOTION_CONFIG } from '@/page-layout/widgets/graph/constants/ChartMotionConfig';
import { useLineChartTheme } from '@/page-layout/widgets/graph/graph-widget-line-chart/hooks/useLineChartTheme';
import { Select } from '@/ui/input/components/Select';
import { Table } from '@/ui/layout/table/components/Table';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { t } from '@lingui/core/macro';
import { styled } from '@linaria/react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { useContext, useMemo, useState } from 'react';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Avatar, H2Title, IconChevronRight } from 'twenty-ui/display';
import { ProgressBar } from 'twenty-ui/feedback';
import { SearchInput } from 'twenty-ui/input';
import { Section } from 'twenty-ui/layout';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { useQuery } from '@apollo/client/react';
import { GetBillingAnalyticsDocument } from '~/generated-metadata/graphql';
import { formatDate } from '~/utils/date-utils';
import { normalizeSearchText } from '~/utils/normalizeSearchText';

const getExecutionTypeLabel = (key: string): string => {
  switch (key) {
    case 'ai_token':
      return t`AI Chat`;
    case 'workflow_execution':
      return t`Workflow Execution`;
    case 'code_execution':
      return t`Code Execution`;
    default:
      return key;
  }
};

type PeriodPreset = '7d' | '30d' | '90d';

const StyledBarRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledBarLabel = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledLabelText = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledValueText = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const StyledPieChartContainer = styled.div`
  height: 220px;
  width: 100%;
`;

const StyledSearchInputContainer = styled.div`
  padding-bottom: ${themeCssVariables.spacing[2]};
`;

const StyledIconChevronRightContainer = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
`;

const StyledClickableTable = styled(Table)`
  a > * {
    cursor: pointer;
  }
`;

const USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS = '1fr 120px 36px';

const getChartColors = (theme: {
  color: {
    blue: string;
    purple: string;
    turquoise: string;
    orange: string;
    pink: string;
    green: string;
  };
}): string[] => [
  theme.color.blue,
  theme.color.purple,
  theme.color.turquoise,
  theme.color.orange,
  theme.color.pink,
  theme.color.green,
];

const getPeriodDates = (
  preset: PeriodPreset,
): { periodStart: string; periodEnd: string } => {
  const now = new Date();
  const daysMap: Record<PeriodPreset, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };
  const start = new Date(now);

  start.setDate(start.getDate() - daysMap[preset]);

  return {
    periodStart: start.toISOString(),
    periodEnd: now.toISOString(),
  };
};

const usePeriodOptions = () =>
  useMemo(
    () => [
      { value: '7d' as const, label: t`Last 7 days` },
      { value: '30d' as const, label: t`Last 30 days` },
      { value: '90d' as const, label: t`Last 90 days` },
    ],
    [],
  );

export const SettingsBillingAnalyticsSection = () => {
  const { theme } = useContext(ThemeContext);
  const { formatNumber } = useNumberFormat();

  const [typePeriod, setTypePeriod] = useState<PeriodPreset>('30d');
  const [dailyPeriod, setDailyPeriod] = useState<PeriodPreset>('30d');
  const [userPeriod, setUserPeriod] = useState<PeriodPreset>('30d');
  const [resourcePeriod, setResourcePeriod] = useState<PeriodPreset>('30d');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  const chartColors = useMemo(() => getChartColors(theme), [theme]);
  const lineChartTheme = useLineChartTheme();
  const periodOptions = usePeriodOptions();

  const typeDates = useMemo(() => getPeriodDates(typePeriod), [typePeriod]);
  const dailyDates = useMemo(() => getPeriodDates(dailyPeriod), [dailyPeriod]);
  const userDates = useMemo(() => getPeriodDates(userPeriod), [userPeriod]);
  const resourceDates = useMemo(
    () => getPeriodDates(resourcePeriod),
    [resourcePeriod],
  );

  const { data: typeData, loading: typeLoading } = useQuery(
    GetBillingAnalyticsDocument,
    { variables: { input: typeDates } },
  );

  const { data: dailyData, loading: dailyLoading } = useQuery(
    GetBillingAnalyticsDocument,
    { variables: { input: dailyDates } },
  );

  const { data: userData, loading: userLoading } = useQuery(
    GetBillingAnalyticsDocument,
    { variables: { input: userDates } },
  );

  const { data: resourceData, loading: resourceLoading } = useQuery(
    GetBillingAnalyticsDocument,
    { variables: { input: resourceDates } },
  );

  const typeAnalytics = typeData?.getBillingAnalytics;
  const dailyAnalytics = dailyData?.getBillingAnalytics;
  const userAnalytics = userData?.getBillingAnalytics;
  const resourceAnalytics = resourceData?.getBillingAnalytics;

  const usageByExecutionType = typeAnalytics?.usageByExecutionType ?? [];
  const timeSeries = dailyAnalytics?.timeSeries ?? [];
  const usageByUser = userAnalytics?.usageByUser ?? [];
  const usageByResource = resourceAnalytics?.usageByResource ?? [];

  const filteredUsageByUser = useMemo(
    () =>
      usageByUser.filter((item) => {
        const search = normalizeSearchText(userSearchTerm);
        const name = normalizeSearchText(item.label ?? item.key);

        return name.includes(search);
      }),
    [usageByUser, userSearchTerm],
  );

  const allLoading =
    typeLoading && dailyLoading && userLoading && resourceLoading;

  if (allLoading) {
    return null;
  }

  const hasAnyData =
    usageByExecutionType.length > 0 ||
    timeSeries.length > 0 ||
    usageByUser.length > 0 ||
    usageByResource.length > 0;

  const totalCredits = usageByExecutionType.reduce(
    (sum, item) => sum + item.creditsUsed,
    0,
  );

  const pieData = usageByExecutionType.map((item, index) => ({
    id: getExecutionTypeLabel(item.key),
    value: item.creditsUsed,
    color: chartColors[index % chartColors.length],
  }));

  const lineData = [
    {
      id: 'credits',
      data: timeSeries.map((point) => ({
        x: formatDate(point.date, 'MMM d'),
        y: point.creditsUsed,
      })),
    },
  ];

  if (!hasAnyData) {
    return (
      <Section>
        <H2Title
          title={t`Usage Analytics`}
          description={t`Credit usage breakdown for your workspace.`}
        />
        <SubscriptionInfoContainer>
          <SettingsBillingLabelValueItem
            label={t`No usage data`}
            value={t`No credit consumption recorded yet.`}
          />
        </SubscriptionInfoContainer>
      </Section>
    );
  }

  return (
    <>
      {usageByExecutionType.length > 0 && (
        <Section>
          <H2Title
            title={t`Usage by Type`}
            description={`${formatNumber(totalCredits)} ${t`credits`}`}
            adornment={
              <Select
                dropdownId="usage-type-period"
                value={typePeriod}
                options={periodOptions}
                onChange={setTypePeriod}
                needIconCheck
                selectSizeVariant="small"
              />
            }
          />
          <SubscriptionInfoContainer>
            <StyledPieChartContainer>
              <ResponsivePie
                data={pieData}
                margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={2}
                colors={pieData.map((item) => item.color)}
                enableArcLabels={false}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={theme.font.color.secondary}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLinkLabelsDiagonalLength={10}
                arcLinkLabelsStraightLength={10}
                animate
                motionConfig={CHART_MOTION_CONFIG}
                tooltip={({ datum }) => (
                  <div
                    style={{
                      background: theme.background.primary,
                      border: `1px solid ${theme.border.color.medium}`,
                      borderRadius: theme.border.radius.sm,
                      padding: '6px 10px',
                      fontSize: theme.font.size.sm,
                      color: theme.font.color.primary,
                      boxShadow: theme.boxShadow.light,
                    }}
                  >
                    <strong>{datum.id}</strong>: {formatNumber(datum.value)}{' '}
                    {t`credits`}
                  </div>
                )}
              />
            </StyledPieChartContainer>
          </SubscriptionInfoContainer>
        </Section>
      )}

      {timeSeries.length > 0 && (
        <Section>
          <H2Title
            title={t`Daily Usage`}
            description={t`Credit consumption over time.`}
            adornment={
              <Select
                dropdownId="usage-daily-period"
                value={dailyPeriod}
                options={periodOptions}
                onChange={setDailyPeriod}
                needIconCheck
                selectSizeVariant="small"
              />
            }
          />
          <SubscriptionInfoContainer>
            <StyledChartContainer>
              <ResponsiveLine
                data={lineData}
                margin={{ top: 10, right: 20, bottom: 30, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 0,
                  max: 'auto',
                }}
                curve="monotoneX"
                lineWidth={2}
                colors={[theme.color.blue]}
                enablePoints={true}
                pointSize={6}
                pointColor={theme.background.primary}
                pointBorderWidth={2}
                pointBorderColor={theme.color.blue}
                enableArea={true}
                areaOpacity={0.1}
                enableGridX={false}
                enableGridY={true}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 8,
                  tickRotation: timeSeries.length > 14 ? -45 : 0,
                  tickValues:
                    timeSeries.length > 10
                      ? lineData[0].data
                          .filter(
                            (_, index) =>
                              index %
                                Math.ceil(timeSeries.length / 7) ===
                              0,
                          )
                          .map((point) => point.x)
                      : undefined,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 8,
                  tickValues: 5,
                }}
                animate
                motionConfig={CHART_MOTION_CONFIG}
                theme={lineChartTheme}
                enableSlices="x"
                sliceTooltip={({ slice }) => (
                  <div
                    style={{
                      background: theme.background.primary,
                      border: `1px solid ${theme.border.color.medium}`,
                      borderRadius: theme.border.radius.sm,
                      padding: '6px 10px',
                      fontSize: theme.font.size.sm,
                      color: theme.font.color.primary,
                      boxShadow: theme.boxShadow.light,
                    }}
                  >
                    <strong>{slice.points[0]?.data.xFormatted}</strong>:{' '}
                    {formatNumber(Number(slice.points[0]?.data.yFormatted))}{' '}
                    {t`credits`}
                  </div>
                )}
              />
            </StyledChartContainer>
          </SubscriptionInfoContainer>
        </Section>
      )}

      {usageByUser.length > 0 && (
        <Section>
          <H2Title
            title={t`Usage by User`}
            description={t`Click a user to see their daily breakdown.`}
            adornment={
              <Select
                dropdownId="usage-user-period"
                value={userPeriod}
                options={periodOptions}
                onChange={setUserPeriod}
                needIconCheck
                selectSizeVariant="small"
              />
            }
          />
          <StyledSearchInputContainer>
            <SearchInput
              placeholder={t`Search for a user...`}
              value={userSearchTerm}
              onChange={setUserSearchTerm}
            />
          </StyledSearchInputContainer>
          <StyledClickableTable>
            <TableRow
              gridTemplateColumns={USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS}
            >
              <TableHeader>{t`Name`}</TableHeader>
              <TableHeader align="right">{t`Credits`}</TableHeader>
              <TableHeader />
            </TableRow>
            {filteredUsageByUser.map((item) => (
              <TableRow
                key={item.key}
                gridTemplateColumns={USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS}
                to={getSettingsPath(SettingsPath.UsageUserDetail, {
                  userWorkspaceId: item.key,
                })}
              >
                <TableCell
                  color={themeCssVariables.font.color.primary}
                  gap={themeCssVariables.spacing[2]}
                >
                  <Avatar
                    type="rounded"
                    size="md"
                    placeholder={item.label ?? item.key}
                    placeholderColorSeed={item.key}
                  />
                  {item.label ?? item.key}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(item.creditsUsed)}
                </TableCell>
                <TableCell align="center">
                  <StyledIconChevronRightContainer>
                    <IconChevronRight
                      size={theme.icon.size.md}
                      stroke={theme.icon.stroke.sm}
                    />
                  </StyledIconChevronRightContainer>
                </TableCell>
              </TableRow>
            ))}
          </StyledClickableTable>
        </Section>
      )}

      {usageByResource.length > 0 && (
        <Section>
          <H2Title
            title={t`Usage by Resource`}
            description={t`Credit consumption per agent or workflow.`}
            adornment={
              <Select
                dropdownId="usage-resource-period"
                value={resourcePeriod}
                options={periodOptions}
                onChange={setResourcePeriod}
                needIconCheck
                selectSizeVariant="small"
              />
            }
          />
          <SubscriptionInfoContainer>
            {usageByResource.map((item, index) => {
              const resourceTotal = usageByResource.reduce(
                (sum, resource) => sum + resource.creditsUsed,
                0,
              );
              const percentage =
                resourceTotal > 0
                  ? (item.creditsUsed / resourceTotal) * 100
                  : 0;

              return (
                <StyledBarRow key={item.key}>
                  <StyledBarLabel>
                    <StyledLabelText>
                      {item.label ?? item.key}
                    </StyledLabelText>
                    <StyledValueText>
                      {formatNumber(item.creditsUsed)} {t`credits`}
                    </StyledValueText>
                  </StyledBarLabel>
                  <ProgressBar
                    value={percentage < 3 && percentage > 0 ? 3 : percentage}
                    barColor={chartColors[index % chartColors.length]}
                    backgroundColor={theme.background.tertiary}
                    withBorderRadius
                  />
                </StyledBarRow>
              );
            })}
          </SubscriptionInfoContainer>
        </Section>
      )}
    </>
  );
};
