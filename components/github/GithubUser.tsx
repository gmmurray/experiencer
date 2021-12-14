import {
    Avatar,
    CircularProgress,
    Container,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { Box, SxProps, useTheme } from '@mui/system';

import { useGetGithubUser } from '../../lib/queries/github';
import { useRouter } from 'next/router';

const containerProps: SxProps = { textAlign: 'center', pt: 5 };

const GithubUser = () => {
    const theme = useTheme();
    const router = useRouter();

    const { username } = router.query;
    const resolvedUsername = !!username
        ? typeof username === 'string'
            ? username
            : username[0]
        : null;

    const { data, isLoading } = useGetGithubUser(resolvedUsername);

    if (isLoading) {
        return (
            <Container sx={{ ...containerProps }}>
                <CircularProgress />
            </Container>
        );
    } else if (!username || !data) {
        <Container sx={{ ...containerProps }}>
            that user cannot be found
        </Container>;
    }

    return (
        <Container sx={{ pt: containerProps.pt }}>
            <Stack direction="row" spacing={2}>
                <Avatar
                    // @ts-ignore
                    src={data!.userData.avatar_url}
                    sx={{ height: 100, width: 100 }}
                />
                <Link
                    // @ts-ignore
                    href={data!.userData.html_url}
                    target="_blank"
                    rel="noopener"
                >
                    <Typography variant="h2">{resolvedUsername}</Typography>
                </Link>
            </Stack>
            <Box my={2}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    languages
                </Typography>
            </Box>
            <Box my={2}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    profile
                </Typography>
            </Box>
        </Container>
    );
};

export default GithubUser;
