import { SettingsBillingLabelValueItem } from '@/billing/components/internal/SettingsBillingLabelValueItem';
import { SubscriptionInfoContainer } from '@/billing/components/SubscriptionInfoContainer';
import { useNumberFormat } from '@/localization/hooks/useNumberFormat';
import { CHART_MOTION_CONFIG } from '@/page-layout/widgets/graph/constants/ChartMotionConfig';
import { useLineChartTheme } from '@/page-layout/widgets/graph/graph-widget-line-chart/hooks/useLineChartTheme';
import { Select } from '@/ui/input/components/Select';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { Trans, useLingui } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { styled } from '@linaria/react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { useContext, useMemo, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Avatar, H2Title } from 'twenty-ui/display';
import { Section } from 'twenty-ui/layout';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { useQuery } from '@apollo/client/react';
import { GetBillingAnalyticsDocument } from '~/generated-metadata/graphql';
import { formatDate } from '~/utils/date-utils';

type PeriodPreset = '7d' | '30d' | '90d';

const StyledChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const StyledPieChartContainer = styled.div`
  height: 220px;
  width: 100%;
`;

const StyledUserHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  margin-bottom: ${themeCssVariables.spacing[4]};
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserName = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledUserCredits = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

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

export const SettingsUsageUserDetail = () => {
  const { t: tLingui } = useLingui();
  const { userWorkspaceId } = useParams<{ userWorkspaceId: string }>();
  const { theme } = useContext(ThemeContext);
  const { formatNumber } = useNumberFormat();
  const lineChartTheme = useLineChartTheme();
  const chartColors = useMemo(() => getChartColors(theme), [theme]);

  const [dailyPeriod, setDailyPeriod] = useState<PeriodPreset>('30d');
  const [typePeriod, setTypePeriod] = useState<PeriodPreset>('30d');

  const periodOptions = useMemo(
    () => [
      { value: '7d' as const, label: t`Last 7 days` },
      { value: '30d' as const, label: t`Last 30 days` },
      { value: '90d' as const, label: t`Last 90 days` },
    ],
    [],
  );

  const dailyDates = useMemo(() => getPeriodDates(dailyPeriod), [dailyPeriod]);
  const typeDates = useMemo(() => getPeriodDates(typePeriod), [typePeriod]);

  const { data: dailyData, loading: dailyLoading } = useQuery(
    GetBillingAnalyticsDocument,
    {
      variables: {
        input: {
          ...dailyDates,
          userWorkspaceId,
        },
      },
      skip: !userWorkspaceId,
    },
  );

  const { data: typeData, loading: typeLoading } = useQuery(
    GetBillingAnalyticsDocument,
    {
      variables: {
        input: {
          ...typeDates,
          userWorkspaceId,
        },
      },
      skip: !userWorkspaceId,
    },
  );

  const dailyAnalytics = dailyData?.getBillingAnalytics;
  const typeAnalytics = typeData?.getBillingAnalytics;

  const userDailyUsage = dailyAnalytics?.userDailyUsage?.dailyUsage ?? [];
  const usageByExecutionType = typeAnalytics?.usageByExecutionType ?? [];

  const userName =
    dailyAnalytics?.usageByUser?.find(
      (item) => item.key === userWorkspaceId,
    )?.label ??
    typeAnalytics?.usageByUser?.find(
      (item) => item.key === userWorkspaceId,
    )?.label;

  const totalCredits = usageByExecutionType.reduce(
    (sum, item) => sum + item.creditsUsed,
    0,
  );

  const displayName = userName ?? userWorkspaceId ?? '';

  const pieData = usageByExecutionType.map((item, index) => ({
    id: getExecutionTypeLabel(item.key),
    value: item.creditsUsed,
    color: chartColors[index % chartColors.length],
  }));

  const lineData = [
    {
      id: 'credits',
      data: userDailyUsage.map((point) => ({
        x: formatDate(point.date, 'MMM d'),
        y: point.creditsUsed,
      })),
    },
  ];

  const isInitialLoading = dailyLoading && typeLoading && !dailyData && !typeData;

  const breadcrumbLinks = [
    {
      children: <Trans>Workspace</Trans>,
      href: getSettingsPath(SettingsPath.Workspace),
    },
    {
      children: <Trans>Usage</Trans>,
      href: getSettingsPath(SettingsPath.Usage),
    },
    { children: isInitialLoading ? '' : displayName },
  ];

  if (isInitialLoading) {
    return (
      <SubMenuTopBarContainer
        title={tLingui`User Usage`}
        links={breadcrumbLinks}
      >
        <SettingsPageContainer>
          <SkeletonTheme
            baseColor={theme.background.tertiary}
            highlightColor={theme.background.transparent.lighter}
            borderRadius={4}
          >
            <StyledUserHeader>
              <Skeleton width={40} height={40} borderRadius={8} />
              <StyledUserInfo>
                <Skeleton width={160} height={16} />
                <Skeleton width={100} height={13} />
              </StyledUserInfo>
            </StyledUserHeader>
            <Section>
              <Skeleton width={120} height={16} />
              <Skeleton
                width="100%"
                height={200}
                borderRadius={8}
                style={{ marginTop: 16 }}
              />
            </Section>
            <Section>
              <Skeleton width={120} height={16} />
              <Skeleton
                width="100%"
                height={220}
                borderRadius={8}
                style={{ marginTop: 16 }}
              />
            </Section>
          </SkeletonTheme>
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    );
  }

  return (
    <SubMenuTopBarContainer
      title={tLingui`User Usage`}
      links={breadcrumbLinks}
    >
      <SettingsPageContainer>
        <StyledUserHeader>
          <Avatar
            type="rounded"
            size="xl"
            placeholder={displayName}
            placeholderColorSeed={userWorkspaceId}
          />
          <StyledUserInfo>
            <StyledUserName>{displayName}</StyledUserName>
            <StyledUserCredits>
              {formatNumber(totalCredits)} {t`credits used`}
            </StyledUserCredits>
          </StyledUserInfo>
        </StyledUserHeader>

        {userDailyUsage.length === 0 && pieData.length === 0 && (
          <Section>
            <SubscriptionInfoContainer>
              <SettingsBillingLabelValueItem
                label={t`No usage data`}
                value={t`No credit consumption recorded for this user.`}
              />
            </SubscriptionInfoContainer>
          </Section>
        )}

        {userDailyUsage.length > 0 && (
          <Section>
            <H2Title
              title={t`Daily Usage`}
              description={t`Per-day credit consumption.`}
              adornment={
                <Select
                  dropdownId="user-daily-period"
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
                    tickRotation: userDailyUsage.length > 14 ? -45 : 0,
                    tickValues:
                      userDailyUsage.length > 10
                        ? lineData[0].data
                            .filter(
                              (_, index) =>
                                index %
                                  Math.ceil(userDailyUsage.length / 7) ===
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
                      {formatNumber(
                        Number(slice.points[0]?.data.yFormatted),
                      )}{' '}
                      {t`credits`}
                    </div>
                  )}
                />
              </StyledChartContainer>
            </SubscriptionInfoContainer>
          </Section>
        )}

        {usageByExecutionType.length > 0 && (
          <Section>
            <H2Title
              title={t`Usage by Type`}
              description={`${formatNumber(totalCredits)} ${t`credits`}`}
              adornment={
                <Select
                  dropdownId="user-type-period"
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
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
