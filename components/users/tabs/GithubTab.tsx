import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { GithubUser } from '../../../entities/GithubUser';
import { useGetUser } from '../../../lib/queries/users';
import GithubUserComponent from '../../../components/github/GithubUser';
import CenteredCircularProgress from '../../shared/CenteredCircularProgress';
import CenteredContainer from '../../shared/CenteredContainer';
import { UserTabComponent } from './ViewUserTabs';

const GithubTab: FC<UserTabComponent> = ({ userId, isCurrentUser }) => {
    const { data: queryUser, isLoading: isUserLoading } = useGetUser(
        isCurrentUser ? null : userId,
    );
    const { data: session } = useSession();

    const tabUser = isCurrentUser
        ? (session?.user as GithubUser | null)
        : queryUser;

    if (isUserLoading) {
        return <CenteredCircularProgress />;
    } else if (!tabUser) {
        <CenteredContainer>user could not be found</CenteredContainer>;
    }
    return <GithubUserComponent username={tabUser?.login} />;
};

export default GithubTab;
