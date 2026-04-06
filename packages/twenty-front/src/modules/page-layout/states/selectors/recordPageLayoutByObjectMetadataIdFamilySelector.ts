import { pageLayoutsWithRelationsSelector } from '@/page-layout/states/pageLayoutsWithRelationsSelector';
import { type PageLayout } from '@/page-layout/types/PageLayout';
import { createAtomFamilySelector } from '@/ui/utilities/state/jotai/utils/createAtomFamilySelector';
import { PageLayoutType } from '~/generated-metadata/graphql';

export const recordPageLayoutByObjectMetadataIdFamilySelector =
  createAtomFamilySelector<
    PageLayout | undefined,
    { objectMetadataId: string }
  >({
    key: 'recordPageLayoutByObjectMetadataIdFamilySelector',
    get:
      ({ objectMetadataId }) =>
      ({ get }) => {
        const pageLayouts = get(pageLayoutsWithRelationsSelector);

        const matchingLayouts = pageLayouts.filter(
          (pageLayout) =>
            pageLayout.type === PageLayoutType.RECORD_PAGE &&
            pageLayout.objectMetadataId === objectMetadataId,
        );

        if (matchingLayouts.length === 0) {
          return undefined;
        }

        if (matchingLayouts.length === 1) {
          return matchingLayouts[0];
        }

        // Merge tabs from all matching layouts (e.g. multiple SDK apps
        // defining page layouts for the same object) into the first layout.
        const [baseLayout, ...otherLayouts] = matchingLayouts;

        const mergedTabs = [
          ...baseLayout.tabs,
          ...otherLayouts.flatMap((layout) => layout.tabs),
        ];

        return {
          ...baseLayout,
          tabs: mergedTabs,
        };
      },
  });
