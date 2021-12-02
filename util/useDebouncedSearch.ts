import debounce from 'lodash.debounce';
import { useMemo } from 'react';

export const useDebouncedSearch = (
    handler: (params: any) => any,
    timeout: number,
) => useMemo(() => debounce(handler, timeout), [handler, timeout]);
