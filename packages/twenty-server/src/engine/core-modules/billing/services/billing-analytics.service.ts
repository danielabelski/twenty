/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import { ClickHouseService } from 'src/database/clickHouse/clickHouse.service';
import { formatDateForClickHouse } from 'src/database/clickHouse/clickHouse.util';
import { toDisplayCredits } from 'src/engine/core-modules/billing/utils/to-display-credits.util';

export type BillingUsageBreakdownItem = {
  key: string;
  label?: string;
  creditsUsed: number;
};

export type BillingUsageTimeSeriesPoint = {
  date: string;
  creditsUsed: number;
};

type PeriodParams = {
  workspaceId: string;
  periodStart: Date;
  periodEnd: Date;
};

@Injectable()
export class BillingAnalyticsService {
  private readonly logger = new Logger(BillingAnalyticsService.name);

  constructor(private readonly clickHouseService: ClickHouseService) {}

  async getUsageByUser(
    params: PeriodParams,
  ): Promise<BillingUsageBreakdownItem[]> {
    return this.queryBreakdown({
      ...params,
      groupByField: 'userWorkspaceId',
      extraWhere: "AND userWorkspaceId != ''",
    });
  }

  async getUsageByResource(
    params: PeriodParams,
  ): Promise<BillingUsageBreakdownItem[]> {
    return this.queryBreakdown({
      ...params,
      groupByField: 'resourceId',
      extraWhere: "AND resourceId != ''",
    });
  }

  async getUsageByExecutionType(
    params: PeriodParams & { userWorkspaceId?: string },
  ): Promise<BillingUsageBreakdownItem[]> {
    return this.queryBreakdown({
      ...params,
      groupByField: 'executionType',
      ...(params.userWorkspaceId && {
        extraWhere: 'AND userWorkspaceId = {userWorkspaceId:String}',
        extraParams: { userWorkspaceId: params.userWorkspaceId },
      }),
    });
  }

  async getUsageByUserTimeSeries(
    params: PeriodParams & { userWorkspaceId: string },
  ): Promise<BillingUsageTimeSeriesPoint[]> {
    return this.queryTimeSeries({
      ...params,
      extraWhere: 'AND userWorkspaceId = {userWorkspaceId:String}',
      extraParams: { userWorkspaceId: params.userWorkspaceId },
    });
  }

  async getUsageTimeSeries(
    params: PeriodParams,
  ): Promise<BillingUsageTimeSeriesPoint[]> {
    return this.queryTimeSeries(params);
  }

  private async queryBreakdown({
    workspaceId,
    periodStart,
    periodEnd,
    groupByField,
    extraWhere = '',
    extraParams = {},
  }: PeriodParams & {
    groupByField: string;
    extraWhere?: string;
    extraParams?: Record<string, unknown>;
  }): Promise<BillingUsageBreakdownItem[]> {
    const query = `
      SELECT
        ${groupByField} AS key,
        sum(creditsUsed) AS creditsUsed
      FROM billingEvent
      WHERE workspaceId = {workspaceId:String}
        AND timestamp >= {periodStart:String}
        AND timestamp < {periodEnd:String}
        ${extraWhere}
      GROUP BY ${groupByField}
      ORDER BY creditsUsed DESC
      LIMIT 50
    `;

    const rows =
      await this.clickHouseService.select<BillingUsageBreakdownItem>(query, {
        workspaceId,
        periodStart: formatDateForClickHouse(periodStart),
        periodEnd: formatDateForClickHouse(periodEnd),
        ...extraParams,
      });

    return rows.map((row) => ({
      ...row,
      creditsUsed: toDisplayCredits(row.creditsUsed),
    }));
  }

  private async queryTimeSeries({
    workspaceId,
    periodStart,
    periodEnd,
    extraWhere = '',
    extraParams = {},
  }: PeriodParams & {
    extraWhere?: string;
    extraParams?: Record<string, unknown>;
  }): Promise<BillingUsageTimeSeriesPoint[]> {
    const query = `
      SELECT
        formatDateTime(timestamp, '%Y-%m-%d') AS date,
        sum(creditsUsed) AS creditsUsed
      FROM billingEvent
      WHERE workspaceId = {workspaceId:String}
        AND timestamp >= {periodStart:String}
        AND timestamp < {periodEnd:String}
        ${extraWhere}
      GROUP BY date
      ORDER BY date ASC
    `;

    const rows =
      await this.clickHouseService.select<BillingUsageTimeSeriesPoint>(query, {
        workspaceId,
        periodStart: formatDateForClickHouse(periodStart),
        periodEnd: formatDateForClickHouse(periodEnd),
        ...extraParams,
      });

    return rows.map((row) => ({
      ...row,
      creditsUsed: toDisplayCredits(row.creditsUsed),
    }));
  }
}
