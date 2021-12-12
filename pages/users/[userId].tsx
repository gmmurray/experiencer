import { CircularProgress, Container } from '@mui/material';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CenteredContainer from '../../components/shared/CenteredContainer';
import { useGetUserPageSettings } from '../../lib/queries/userPageSettings';
import CreateUserPageSettingsPanel from '../../components/users/settings/CreateUserPageSettingsPanel';
import ViewUserTabs from '../../components/users/tabs/ViewUserTabs';

const ViewUser: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { userId } = router.query;
    const resolvedUserId = !!userId
        ? typeof userId === 'string'
            ? userId
            : userId[0]
        : null;

    const [isCurrentUser, setIsCurrentUser] = useState(false);
    useEffect(() => {
        if (
            session &&
            session.user &&
            // @ts-ignore
            session.user._id.toString() === resolvedUserId
        ) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [resolvedUserId, session]);
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
                <CreateUserPageSettingsPanel userId={resolvedUserId} />
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
