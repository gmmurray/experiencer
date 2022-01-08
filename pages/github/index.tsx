import { Box, Container, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { DEFAULT_PAGING_STATE, PagingState } from '../../lib/types/pagingState';

import GithubUserList from '../../components/github/GithubUserList';
import { useDebouncedSearch } from '../../util/useDebouncedSearch';
import { useSearchGithubUsers } from '../../lib/queries/github';

const Github = () => {
    const [searchValue, setSearchValue] = useState<string | null>(null);
    const [pageState, setPageState] =
        useState<PagingState>(DEFAULT_PAGING_STATE);

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        if (value === '') setSearchValue(null);
        else setSearchValue(value);
    }, []);

    const debouncedSearch = useDebouncedSearch(handleSearch, 500);

    const handlePageChange = useCallback(
        (event: React.ChangeEvent<unknown>, page: number) => {
            setPageState(state => ({ ...state, page }));
        },
        [],
    );

    const { data, isLoading } = useSearchGithubUsers(pageState, searchValue);

    const renderResults = () => {
        if (searchValue === null) {
            return (
                <Container sx={{ textAlign: 'center', pt: 5 }}>
                    search for a github user
                </Container>
            );
        } else {
            return (
                <GithubUserList
                    data={data}
                    isLoading={isLoading}
                    onPageChange={handlePageChange}
                    currentPage={pageState.page}
                    pageSize={pageState.size}
                />
            );
        }
    };

    return (
        <Container>
            <Box sx={{ minHeight: 400, p: 2, my: 2 }}>
                <Typography variant="h2" className="special-text">
                    find a github profile
                </Typography>
                <TextField
                    variant="standard"
                    fullWidth
                    margin="normal"
                    onChange={debouncedSearch}
                />
                {renderResults()}
            </Box>
        </Container>
    );
};

export default Github;
