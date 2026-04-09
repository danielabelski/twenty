import { isNonEmptyString } from '@sniptt/guards';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationMenuItemType } from 'twenty-shared/types';
import { useIsMobile } from 'twenty-ui/utilities';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

import { activeNavigationItemState } from '@/navigation-menu-item/common/states/activeNavigationItemState';
import { currentNavigationMenuItemFolderIdState } from '@/navigation-menu-item/common/states/currentNavigationMenuItemFolderIdState';
import { openNavigationMenuItemFolderIdsState } from '@/navigation-menu-item/common/states/openNavigationMenuItemFolderIdsState';
import { resolveFolderSelectedNavigationMenuItemIndex } from '@/navigation-menu-item/display/folder/utils/resolveFolderSelectedNavigationMenuItemIndex';
import { useNavigationMenuItemsData } from '@/navigation-menu-item/display/hooks/useNavigationMenuItemsData';
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
  const { workspaceNavigationMenuItems } = useNavigationMenuItemsData();

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
      for (const item of navigationMenuItems) {
        if (item.type === NavigationMenuItemType.LINK) {
          continue;
        }
        const link = getNavigationMenuItemComputedLink(
          item,
          objectMetadataItems,
          views,
        );
        if (isNonEmptyString(link)) {
          navigate(link);
          break;
        }
      }
    }
  };

  const activeNavigationItem = useAtomStateValue(activeNavigationItemState);

  const selectedNavigationMenuItemIndex =
    resolveFolderSelectedNavigationMenuItemIndex({
      navigationMenuItems,
      activeNavigationItem,
      currentPath,
      currentViewPath,
      objectMetadataItems,
      views,
      workspaceNavigationMenuItems,
    });

  return {
    isOpen,
    handleToggle,
    selectedNavigationMenuItemIndex,
  };
};
