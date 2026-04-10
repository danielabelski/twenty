import {
  type Application,
  ApplicationRegistration,
} from '~/generated-metadata/graphql';

export type ApplicationWithoutRelation = Omit<
  Application,
  'objects' | 'applicationRegistration'
> & {
  objects: { id: string }[];
  applicationRegistration?: Pick<
    ApplicationRegistration,
    'id' | 'latestAvailableVersion' | 'sourceType' | 'logoUrl'
  > | null;
};
