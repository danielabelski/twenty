import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

type ActiveNavigationItem = {
  navItemId: string;
  objectNameSingular: string;
};

export const activeNavigationItemState =
  createAtomState<ActiveNavigationItem | null>({
    key: 'activeNavigationItemState',
    defaultValue: null,
  });
