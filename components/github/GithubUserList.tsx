import {
    CircularProgress,
    Container,
    Divider,
    List,
    Pagination,
} from '@mui/material';
import { FC, Fragment, useCallback } from 'react';

import GithubUserListItem from './GithubUserListItem';
import { SxProps } from '@mui/system';
import { UserSearchResponseDataType } from '../../lib/types/octokitTypes';
import { getPageCount } from '../../util/getPageCount';
import { useRouter } from 'next/router';

const containerProps: SxProps = { textAlign: 'center', pt: 5 };

type GithubUserListProps = {
    data?: UserSearchResponseDataType | null;
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

const GithubUserList: FC<GithubUserListProps> = ({
    data,
    isLoading,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    const router = useRouter();

    const handleGithubLinkClick = useCallback(
        (url: string) => () =>
            window.open(url, '_blank', 'noopener,noreferrer'),
        [],
    );

    const handleSelectUser = useCallback(
        (login: string) => () => router.push(`/github/${login}`),
        [router],
    );

    if (isLoading) {
        return (
            <Container sx={{ ...containerProps }}>
                <CircularProgress />
            </Container>
        );
    } else if (!data || data.total_count === 0) {
        return <Container sx={{ ...containerProps }}>no users found</Container>;
    }

    const showPagination = data.total_count > pageSize;
    const paginationCount = getPageCount(data.total_count, pageSize);

    return (
        <Fragment>
            <List>
                {(data?.items ?? []).map((u, index) => {
                    const showDivider =
                        data.total_count !== 1 && index !== pageSize - 1;
                    return (
                        <Fragment key={u.id}>
                            <GithubUserListItem
                                user={u}
                                onGithubLinkClick={handleGithubLinkClick(
                                    u.html_url,
                                )}
                                onSelectUser={handleSelectUser(u.login)}
                            />
                            {showDivider && <Divider />}
                        </Fragment>
                    );
                })}
            </List>
            {showPagination && (
                <Pagination
                    count={paginationCount}
                    page={currentPage}
                    onChange={onPageChange}
                />
            )}
        </Fragment>
    );
};

export default GithubUserList;
