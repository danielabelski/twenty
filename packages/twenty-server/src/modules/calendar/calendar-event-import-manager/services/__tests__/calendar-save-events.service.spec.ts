import { type CalendarChannelEntity } from 'src/engine/metadata-modules/calendar-channel/entities/calendar-channel.entity';
import { type ConnectedAccountEntity } from 'src/engine/metadata-modules/connected-account/entities/connected-account.entity';
import { CalendarSaveEventsService } from 'src/modules/calendar/calendar-event-import-manager/services/calendar-save-events.service';
import { type FetchedCalendarEvent } from 'src/modules/calendar/common/types/fetched-calendar-event';

let eventStore: Record<string, any>[];
let associationStore: Record<string, any>[];

const mockCalendarEventRepository = {
  find: jest.fn(async ({ where }: any) => {
    const iCalUids: string[] = where.iCalUid.value;

    return eventStore.filter((e) => iCalUids.includes(e.iCalUid));
  }),
  insert: jest.fn(async (entities: any[]) => {
    eventStore.push(...entities);
  }),
  updateMany: jest.fn(async (updates: any[]) => {
    for (const { criteria, partialEntity } of updates) {
      const idx = eventStore.findIndex((e) => e.id === criteria);

      if (idx !== -1) {
        eventStore[idx] = { ...eventStore[idx], ...partialEntity };
      }
    }
  }),
};

const mockAssociationRepository = {
  insert: jest.fn(async (entities: any[]) => {
    associationStore.push(...entities);
  }),
};

const mockCalendarEventParticipantService = {
  upsertAndDeleteCalendarEventParticipants: jest.fn(),
};

const mockGlobalWorkspaceOrmManager = {
  executeInWorkspaceContext: jest.fn(async (callback: () => Promise<void>) => {
    await callback();
  }),
  getRepository: jest.fn(async (_workspaceId: string, entityName: string) => {
    if (entityName === 'calendarEvent') return mockCalendarEventRepository;
    if (entityName === 'calendarChannelEventAssociation')
      return mockAssociationRepository;

    return {};
  }),
  getGlobalWorkspaceDataSource: jest.fn(async () => ({
    transaction: async (callback: (manager: unknown) => Promise<void>) => {
      await callback({} as any);
    },
  })),
};

const workspaceId = 'workspace-123';

const calendarChannel = {
  id: 'channel-123',
} as unknown as CalendarChannelEntity;

const connectedAccount = {
  id: 'account-123',
} as unknown as ConnectedAccountEntity;

const SHARED_ICAL_UID =
  '040000008200E00074C5B7101A82E0080000000030EA36F0D6ACDC01000000000000000010000000DAD2907D895870419A226EB4E0FE7607';
const MASTER_ID = 'recurring_master_abc';

const createRecurringEventInstance = (
  date: string,
  startsAt: string,
): FetchedCalendarEvent => ({
  id: `${MASTER_ID}_${date}`,
  iCalUid: SHARED_ICAL_UID,
  recurringEventExternalId: MASTER_ID,
  title: 'Weekly Sync',
  startsAt,
  endsAt: startsAt,
  description: '',
  location: '',
  isFullDay: false,
  isCanceled: false,
  conferenceLinkLabel: '',
  conferenceLinkUrl: '',
  externalCreatedAt: '',
  externalUpdatedAt: '',
  conferenceSolution: '',
  participants: [],
  status: 'confirmed',
});

describe('CalendarSaveEventsService', () => {
  let service: CalendarSaveEventsService;

  const save = (events: FetchedCalendarEvent[]) =>
    service.saveCalendarEventsAndEnqueueContactCreationJob(
      events,
      calendarChannel,
      connectedAccount,
      workspaceId,
    );

  beforeEach(() => {
    jest.clearAllMocks();
    eventStore = [];
    associationStore = [];

    service = new CalendarSaveEventsService(
      mockGlobalWorkspaceOrmManager as any,
      mockCalendarEventParticipantService as any,
    );
  });

  describe('recurring event instances with shared iCalUID', () => {
    it('should store only one record per recurring series', async () => {
      await save([
        createRecurringEventInstance('20260410', '2026-04-10T16:30:00+03:00'),
      ]);
      await save([
        createRecurringEventInstance('20260417', '2026-04-17T16:30:00+03:00'),
      ]);

      expect(eventStore).toHaveLength(1);
      expect(associationStore).toHaveLength(2);
    });

    it('should store one record when multiple instances arrive in the same batch', async () => {
      await save([
        createRecurringEventInstance('20260410', '2026-04-10T16:30:00+03:00'),
        createRecurringEventInstance('20260417', '2026-04-17T16:30:00+03:00'),
        createRecurringEventInstance('20260424', '2026-04-24T16:30:00+03:00'),
      ]);

      expect(eventStore).toHaveLength(1);
      expect(associationStore).toHaveLength(1);
    });

    it('should store the parsed recurrence text from the master event', async () => {
      const masterEvent: FetchedCalendarEvent = {
        id: MASTER_ID,
        iCalUid: SHARED_ICAL_UID,
        title: 'Weekly Sync',
        startsAt: '2026-04-10T16:30:00+03:00',
        endsAt: '2026-04-10T17:00:00+03:00',
        description: '',
        location: '',
        isFullDay: false,
        isCanceled: false,
        conferenceLinkLabel: '',
        conferenceLinkUrl: '',
        externalCreatedAt: '',
        externalUpdatedAt: '',
        conferenceSolution: '',
        recurrence: 'every week on Friday until March 31, 2027',
        participants: [],
        status: 'confirmed',
      };

      await save([masterEvent]);

      expect(eventStore).toHaveLength(1);
      expect(eventStore[0].recurrence).toBe(
        'every week on Friday until March 31, 2027',
      );
    });
  });
});
