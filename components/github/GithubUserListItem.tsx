import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import {
    UserProfileResponseDataType,
    UserSearchResponseDataType,
} from '../../lib/types/octokitTypes';

import { FC } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

type GithubUserListItemProps = {
    user: UserSearchResponseDataType['items'][0];
    onGithubLinkClick: (params: any) => any;
    onSelectUser: (params: any) => any;
};

const GithubUserListItem: FC<GithubUserListItemProps> = ({
    user,
    onGithubLinkClick,
    onSelectUser,
}) => {
    const secondaryAction = (
        <IconButton
            edge="end"
            aria-label="view on github"
            onClick={onGithubLinkClick}
        >
            <GitHubIcon />
        </IconButton>
    );
    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={secondaryAction}
            disablePadding
        >
            <ListItemButton onClick={onSelectUser} dense>
                <ListItemAvatar>
                    <Avatar alt={user.login} src={user.avatar_url} />
                </ListItemAvatar>
                <ListItemText primary={user.login} />
            </ListItemButton>
        </ListItem>
    );
};

export default GithubUserListItem;
