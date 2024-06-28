import { buildModuleCacheKey } from "@lib/react-query-utils";

/**
 * Same list can be displayed with the standard page pagination in one place (useQuery)
 * and with the infinite scroll pagination in another place (useInfiniteQuery)
 * We want to keep appropriate query cache entries for them separately
 * So we add { infinite: true } to the query key used with useInfiniteQuery
 */
export type InfiniteQueryKey = {
  infinite?: true;
};

/**
 * `qk` stands for "query keys"
 */
export const qk = buildModuleCacheKey({
  auth: {
    token: {
      refresh: null,
    },
  },
});
