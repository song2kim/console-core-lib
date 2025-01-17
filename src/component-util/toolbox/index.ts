import { ApiQueryHelper } from '@src/space-connector/helper';
import { Query } from '@src/space-connector/type';
import { ToolboxOptions } from '@src/component-util/toolbox/type';

interface Options extends ToolboxOptions {
    sortDesc?: boolean;
}

type Exclude = Partial<Record<keyof Options, boolean>>

export const setApiQueryWithToolboxOptions = (apiQueryHelper: ApiQueryHelper, options: Options = {}, exclude: Exclude = {}): ApiQueryHelper => {
    if (!Object.keys(options).length) return apiQueryHelper;

    if (options.pageStart !== undefined && !exclude.pageStart) apiQueryHelper.setPageStart(options.pageStart);
    if (options.pageLimit !== undefined && !exclude.pageLimit) apiQueryHelper.setPageLimit(options.pageLimit);

    if (options.sortBy !== undefined && !exclude.sortBy) apiQueryHelper.setSortKey(options.sortBy);
    if (options.sortDesc !== undefined && !exclude.sortDesc) apiQueryHelper.setSortDesc(options.sortDesc);

    if (options.queryTags !== undefined && !exclude.sortDesc) {
        apiQueryHelper.setFiltersAsQueryTag(options.queryTags);
    } else if (options.searchText !== undefined && !exclude.sortDesc) {
        apiQueryHelper.setFilters([{ v: options.searchText || '' }]);
    }

    return apiQueryHelper;
};

export const getApiQueryWithToolboxOptions = (apiQueryHelper: ApiQueryHelper, options: any = {}, exclude: Exclude = {}): undefined|Query => {
    setApiQueryWithToolboxOptions(apiQueryHelper, options, exclude);
    return apiQueryHelper.data;
};
