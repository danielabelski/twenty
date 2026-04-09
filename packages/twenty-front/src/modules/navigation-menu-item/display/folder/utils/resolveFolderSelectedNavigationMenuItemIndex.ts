import { NavigationMenuItemType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { doesFolderNavigationMenuItemMatchUrlForSelection } from '@/navigation-menu-item/display/folder/utils/doesFolderNavigationMenuItemMatchUrlForSelection';
import { getObjectMetadataForNavigationMenuItem } from '@/navigation-menu-item/display/object/utils/getObjectMetadataForNavigationMenuItem';
import { getNavigationMenuItemComputedLink } from '@/navigation-menu-item/display/utils/getNavigationMenuItemComputedLink';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type View } from '@/views/types/View';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

type ActiveNavigationItemForFolderSelection = {
  navItemId: string;
  objectNameSingular: string;
};

type ResolveFolderSelectedNavigationMenuItemIndexParams = {
  navigationMenuItems: NavigationMenuItem[];
  activeNavigationItem: ActiveNavigationItemForFolderSelection | null;
  currentPath: string;
  currentViewPath: string;
  objectMetadataItems: EnrichedObjectMetadataItem[];
  views: Pick<View, 'id' | 'objectMetadataId'>[];
  workspaceNavigationMenuItems: NavigationMenuItem[];
};

export const resolveFolderSelectedNavigationMenuItemIndex = ({
  navigationMenuItems,
  activeNavigationItem,
  currentPath,
  currentViewPath,
  objectMetadataItems,
  views,
  workspaceNavigationMenuItems,
}: ResolveFolderSelectedNavigationMenuItemIndexParams): number => {
  const explicitMatchIndex = isDefined(activeNavigationItem)
    ? navigationMenuItems.findIndex(
        (item) => item.id === activeNavigationItem.navItemId,
      )
    : -1;

  const activeNavigationObjectNameSingular =
    activeNavigationItem?.objectNameSingular;

  const isActiveNavigationItemObjectInFolder =
    isDefined(activeNavigationObjectNameSingular) &&
    navigationMenuItems.some((navigationMenuItem) => {
      const objectMetadataItem = getObjectMetadataForNavigationMenuItem(
        navigationMenuItem,
        objectMetadataItems,
        views,
      );

      if (!isDefined(objectMetadataItem)) {
        return false;
      }

      return (
        objectMetadataItem.nameSingular === activeNavigationObjectNameSingular
      );
    });

  const recordMatchIndex = navigationMenuItems.findIndex((item) => {
    if (item.type !== NavigationMenuItemType.RECORD) {
      return false;
    }
    const computedLink = getNavigationMenuItemComputedLink(
      item,
      objectMetadataItems,
      views,
    );
    return computedLink === currentPath;
  });

  const urlMatchIndex = navigationMenuItems.findIndex((folderChildItem) =>
    doesFolderNavigationMenuItemMatchUrlForSelection({
      folderChildNavigationMenuItem: folderChildItem,
      workspaceNavigationMenuItems,
      currentPath,
      currentViewPath,
      objectMetadataItems,
      views,
    }),
  );

  return isActiveNavigationItemObjectInFolder
    ? explicitMatchIndex !== -1
      ? explicitMatchIndex
      : recordMatchIndex
    : urlMatchIndex;
};
