export type PagingState = {
    page: number;
    size: number;
};

export const DEFAULT_PAGING_STATE: PagingState = {
    page: 1,
    size: 10,
};
