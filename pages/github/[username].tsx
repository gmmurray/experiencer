import { Box, Container, Paper } from '@mui/material';

import GithubUser from '../../components/github/GithubUser';
import { NextPage } from 'next';

const ViewGithubUser: NextPage = () => {
    return (
        <Container>
            <Paper className="theme-paper" sx={{ minHeight: 400, p: 2, my: 2 }}>
                <GithubUser />
            </Paper>
        </Container>
    );
};

export default ViewGithubUser;
