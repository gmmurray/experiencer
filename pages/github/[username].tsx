import { Container, Paper } from '@mui/material';

import { NextPage } from 'next';
import GithubUser from '../../components/github/GithubUser';

const ViewGithubUser: NextPage = () => {
    return (
        <Container>
            <Paper elevation={1} sx={{ minHeight: 400, p: 2, my: 2 }}>
                <GithubUser />
            </Paper>
        </Container>
    );
};

export default ViewGithubUser;
