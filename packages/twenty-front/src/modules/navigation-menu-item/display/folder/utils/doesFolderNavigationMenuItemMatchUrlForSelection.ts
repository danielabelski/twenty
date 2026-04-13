import { NavigationMenuItemType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { isLocationMatchingNavigationMenuItem } from '@/navigation-menu-item/common/utils/isLocationMatchingNavigationMenuItem';
import { matchesRecordShowPathForObject } from '@/navigation-menu-item/common/utils/matchesRecordShowPathForObject';
import { getObjectMetadataForNavigationMenuItem } from '@/navigation-menu-item/display/object/utils/getObjectMetadataForNavigationMenuItem';
import { getNavigationMenuItemComputedLink } from '@/navigation-menu-item/display/utils/getNavigationMenuItemComputedLink';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type View } from '@/views/types/View';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

type DoesFolderNavigationMenuItemMatchUrlForSelectionParams = {
  folderChildNavigationMenuItem: NavigationMenuItem;
  workspaceNavigationMenuItems: NavigationMenuItem[];
  currentPath: string;
  currentViewPath: string;
  objectMetadataItems: EnrichedObjectMetadataItem[];
  views: Pick<View, 'id' | 'objectMetadataId'>[];
};

export const doesFolderNavigationMenuItemMatchUrlForSelection = ({
  folderChildNavigationMenuItem,
  workspaceNavigationMenuItems,
  currentPath,
  currentViewPath,
  objectMetadataItems,
  views,
}: DoesFolderNavigationMenuItemMatchUrlForSelectionParams): boolean => {
  const computedLink = getNavigationMenuItemComputedLink(
    folderChildNavigationMenuItem,
    objectMetadataItems,
    views,
  );

  const matchesByLink = isLocationMatchingNavigationMenuItem(
    currentPath,
    currentViewPath,
    folderChildNavigationMenuItem.type,
    computedLink,
  );

  const objectMetadataForFolderChild = getObjectMetadataForNavigationMenuItem(
    folderChildNavigationMenuItem,
    objectMetadataItems,
    views,
  );

  const matchesByRecordShow =
    !matchesByLink &&
    isDefined(objectMetadataForFolderChild) &&
    matchesRecordShowPathForObject(
      currentPath,
      objectMetadataForFolderChild.nameSingular,
    );

  if (!matchesByLink && !matchesByRecordShow) {
    return false;
  }

  if (!isDefined(objectMetadataForFolderChild)) {
    return true;
  }

  return !workspaceNavigationMenuItems.some((workspaceItem) => {
    if (
      isDefined(workspaceItem.folderId) ||
      workspaceItem.type !== NavigationMenuItemType.OBJECT
    ) {
      return false;
    }

    const topLevelComputedLink = getNavigationMenuItemComputedLink(
      workspaceItem,
      objectMetadataItems,
      views,
    );

    if (
      !isLocationMatchingNavigationMenuItem(
        currentPath,
        currentViewPath,
        workspaceItem.type,
        topLevelComputedLink,
      )
    ) {
      return false;
    }

    const objectMetadataForTopLevelItem =
      getObjectMetadataForNavigationMenuItem(
        workspaceItem,
        objectMetadataItems,
        views,
      );

    return (
      isDefined(objectMetadataForTopLevelItem) &&
      objectMetadataForTopLevelItem.id === objectMetadataForFolderChild.id
    );
  });
};
