export const getPageCount = (itemCount: number, pageSize: number) => {
    const count = itemCount > 1000 ? 1000 : itemCount;
    return Math.floor(count / pageSize);
};
