import { Box, Container } from '@mui/material';

import GithubUser from '../../components/github/GithubUser';
import { NextPage } from 'next';

const ViewGithubUser: NextPage = () => {
    return (
        <Container>
            <Box sx={{ minHeight: 400, p: 2, my: 2 }}>
                <GithubUser />
            </Box>
        </Container>
    );
};

export default ViewGithubUser;
