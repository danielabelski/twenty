import { defineNavigationMenuItem } from 'twenty-sdk';
import { NavigationMenuItemType } from 'twenty-shared/types';

import { ALL_CLOUD_USER_2_VIEW_ID } from 'src/views/all-cloud-user-2';

export default defineNavigationMenuItem({
  universalIdentifier: 'ac6df084-0f0f-404a-b3d1-b084cb624d76',
  type: NavigationMenuItemType.VIEW,
  name: 'cloud-user-2',
  icon: 'IconList',
  position: 0,
  viewUniversalIdentifier: ALL_CLOUD_USER_2_VIEW_ID,
});
