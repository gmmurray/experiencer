import { CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';

import CenteredContainer from '../../components/shared/CenteredContainer';
import CreateUserPageSettingsPanel from '../../components/users/settings/CreateUserPageSettingsPanel';
import { NextPage } from 'next';
import ViewUserTabs from '../../components/users/tabs/ViewUserTabs';
import { useGetUserPageSettings } from '../../lib/queries/userPageSettings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { GithubSession } from '../../lib/types/GithubSession';

const ViewUser: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const typedSession = session as GithubSession | null;
    const { userId } = router.query;
    const resolvedUserId = !!userId
        ? typeof userId === 'string'
            ? userId
            : userId[0]
        : null;

    const [isCurrentUser, setIsCurrentUser] = useState(false);
    useEffect(() => {
        if (
            typedSession &&
            typedSession.user &&
            typedSession.user._id.toString() === resolvedUserId
        ) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [resolvedUserId, typedSession]);
    const { data, isLoading } = useGetUserPageSettings(resolvedUserId);

    if (isLoading) {
        return (
            <CenteredContainer>
                <CircularProgress />
            </CenteredContainer>
        );
    } else if (!data && isCurrentUser) {
        return (
            <CenteredContainer>
                do you want to create your settings now
                <CreateUserPageSettingsPanel />
            </CenteredContainer>
        );
    } else if (!data) {
        return <CenteredContainer>user could not be found</CenteredContainer>;
    }
    return (
        <Container sx={{ textAlign: 'center' }}>
            <ViewUserTabs settings={data} isCurrentUser={isCurrentUser} />
        </Container>
    );
};
export default ViewUser;
