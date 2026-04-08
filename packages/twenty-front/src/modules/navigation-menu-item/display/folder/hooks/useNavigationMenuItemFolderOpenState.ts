import { isNonEmptyString } from '@sniptt/guards';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationMenuItemType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { useIsMobile } from 'twenty-ui/utilities';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

import { activeNavigationItemState } from '@/navigation-menu-item/common/states/activeNavigationItemState';
import { currentNavigationMenuItemFolderIdState } from '@/navigation-menu-item/common/states/currentNavigationMenuItemFolderIdState';
import { openNavigationMenuItemFolderIdsState } from '@/navigation-menu-item/common/states/openNavigationMenuItemFolderIdsState';
import { isLocationMatchingNavigationMenuItem } from '@/navigation-menu-item/common/utils/isLocationMatchingNavigationMenuItem';
import { matchesRecordShowPathForObject } from '@/navigation-menu-item/common/utils/matchesRecordShowPathForObject';
import { getObjectMetadataForNavigationMenuItem } from '@/navigation-menu-item/display/object/utils/getObjectMetadataForNavigationMenuItem';
import { getNavigationMenuItemComputedLink } from '@/navigation-menu-item/display/utils/getNavigationMenuItemComputedLink';
import { objectMetadataItemsSelector } from '@/object-metadata/states/objectMetadataItemsSelector';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { viewsSelector } from '@/views/states/selectors/viewsSelector';

type UseNavigationMenuItemFolderOpenStateParams = {
  folderId: string;
  navigationMenuItems: NavigationMenuItem[];
};

export const useNavigationMenuItemFolderOpenState = ({
  folderId,
  navigationMenuItems,
}: UseNavigationMenuItemFolderOpenStateParams) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const currentViewPath = location.pathname + location.search;
  const isMobile = useIsMobile();
  const objectMetadataItems = useAtomStateValue(objectMetadataItemsSelector);
  const views = useAtomStateValue(viewsSelector);

  const [openNavigationMenuItemFolderIds, setOpenNavigationMenuItemFolderIds] =
    useAtomState(openNavigationMenuItemFolderIdsState);
  const setCurrentNavigationMenuItemFolderId = useSetAtomState(
    currentNavigationMenuItemFolderIdState,
  );

  const isOpen = openNavigationMenuItemFolderIds.includes(folderId);

  const handleToggle = () => {
    if (isMobile) {
      setCurrentNavigationMenuItemFolderId((prev) =>
        prev === folderId ? null : folderId,
      );
    } else {
      setOpenNavigationMenuItemFolderIds((current) =>
        isOpen
          ? current.filter((id) => id !== folderId)
          : [...current, folderId],
      );
    }

    if (!isOpen) {
      const firstNonLinkItem = navigationMenuItems.find((item) => {
        if (item.type === NavigationMenuItemType.LINK) {
          return false;
        }
        const computedLink = getNavigationMenuItemComputedLink(
          item,
          objectMetadataItems,
          views,
        );
        return isNonEmptyString(computedLink);
      });
      if (isDefined(firstNonLinkItem)) {
        const link = getNavigationMenuItemComputedLink(
          firstNonLinkItem,
          objectMetadataItems,
          views,
        );
        if (isNonEmptyString(link)) {
          navigate(link);
        }
      }
    }
  };

  const activeNavigationItem = useAtomStateValue(activeNavigationItemState);

  const explicitMatchIndex = isDefined(activeNavigationItem)
    ? navigationMenuItems.findIndex(
        (item) => item.id === activeNavigationItem.navItemId,
      )
    : -1;

  const isAtomRelevantToFolder =
    isDefined(activeNavigationItem) &&
    navigationMenuItems.some((item) => {
      const objectMetadataItem = getObjectMetadataForNavigationMenuItem(
        item,
        objectMetadataItems,
        views,
      );
      return (
        isDefined(objectMetadataItem) &&
        objectMetadataItem.nameSingular ===
          activeNavigationItem.objectNameSingular
      );
    });

  const recordMatchIndex = navigationMenuItems.findIndex((item) => {
    if (item.type !== NavigationMenuItemType.RECORD) return false;
    const computedLink = getNavigationMenuItemComputedLink(
      item,
      objectMetadataItems,
      views,
    );
    return computedLink === currentPath;
  });

  const urlMatchIndex = navigationMenuItems.findIndex((item) => {
    const computedLink = getNavigationMenuItemComputedLink(
      item,
      objectMetadataItems,
      views,
    );

    if (
      isLocationMatchingNavigationMenuItem(
        currentPath,
        currentViewPath,
        item.type,
        computedLink,
      )
    ) {
      return true;
    }

    if (item.type === NavigationMenuItemType.OBJECT) {
      const objectMetadataItem = getObjectMetadataForNavigationMenuItem(
        item,
        objectMetadataItems,
        views,
      );
      if (isDefined(objectMetadataItem)) {
        return matchesRecordShowPathForObject(
          currentPath,
          objectMetadataItem.nameSingular,
        );
      }
    }

    return false;
  });

  const selectedNavigationMenuItemIndex = isAtomRelevantToFolder
    ? explicitMatchIndex !== -1
      ? explicitMatchIndex
      : recordMatchIndex
    : urlMatchIndex;

  return {
    isOpen,
    handleToggle,
    selectedNavigationMenuItemIndex,
  };
};
