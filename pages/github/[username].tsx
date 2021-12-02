import {
    CircularProgress,
    Container,
    Paper,
    Typography,
    Stack,
    Link,
    Avatar,
} from '@mui/material';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetGithubUser } from '../../lib/queries/github';
import { Box } from '@mui/system';
import GithubUserLanguages from '../../components/github/GithubUserLanguages';
import GithubUserProfile from '../../components/github/GithubUserProfile';

const ViewGithubUser: NextPage = () => {
    const router = useRouter();
    const { username } = router.query;
    const resolvedUsername = !!username
        ? typeof username === 'string'
            ? username
            : username[0]
        : null;

    const { data, isLoading } = useGetGithubUser(resolvedUsername);

    const renderContent = () => {
        if (isLoading) {
            return (
                <Container sx={{ textAlign: 'center', pt: 5 }}>
                    <CircularProgress />
                </Container>
            );
        } else if (!data) {
            return (
                <Container sx={{ textAlign: 'center', pt: 5 }}>
                    that user cannot be found
                </Container>
            );
        } else {
            return (
                <Container sx={{ pt: 5 }}>
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            // @ts-ignore
                            src={data.userData.avatar_url}
                            sx={{ height: 100, width: 100 }}
                        />
                        <Link
                            // @ts-ignore
                            href={data.userData.html_url}
                            target="_blank"
                            rel="noopener"
                        >
                            <Typography variant="h2">
                                {resolvedUsername}
                            </Typography>
                        </Link>
                    </Stack>
                    <Box my={2}>
                        <Typography variant="h4" sx={{ my: 2 }}>
                            languages
                        </Typography>
                        <GithubUserLanguages data={data.languageCounts} />
                    </Box>
                    <Typography variant="h4" sx={{ my: 2 }}>
                        profile
                    </Typography>
                    <GithubUserProfile data={data.userData} />
                </Container>
            );
        }
    };
    return (
        <Container>
            <Paper elevation={1} sx={{ minHeight: 400, p: 2, my: 2 }}>
                {renderContent()}
            </Paper>
        </Container>
    );
};

export default ViewGithubUser;
