import { Paper, Tab, Typography } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Box } from '@mui/system';
import ExperiencesTab from './ExperiencesTab';
import GithubTab from './GithubTab';
import TimeLineTab from './TimeLineTab';
import { UserPageSettings } from '../../../entities/UserPageSettings';
import UserPageSettingsTab from './UserPageSettingsTab';
import { useRouter } from 'next/router';

export type UserTabComponent = {
    userId: string;
    isCurrentUser: boolean;
};

type TabDefinition = {
    name: string;
    authRequired: boolean;
    component: FC<UserTabComponent>;
    value: number;
    settingsKey?: ('enableTimeline' | 'enableExperiences' | 'enableGithub') &
        keyof UserPageSettings;
};

const tabs: TabDefinition[] = [
    {
        name: 'timeline',
        authRequired: false,
        settingsKey: 'enableTimeline',
        component: TimeLineTab,
        value: 0,
    },
    {
        name: 'experiences',
        authRequired: false,
        settingsKey: 'enableExperiences',
        component: ExperiencesTab,
        value: 1,
    },
    {
        name: 'github',
        authRequired: false,
        settingsKey: 'enableGithub',
        component: GithubTab,
        value: 2,
    },
    {
        name: 'page settings',
        authRequired: true,
        component: UserPageSettingsTab,
        value: 3,
    },
];

type ViewUserTabsProps = {
    settings: UserPageSettings;
    isCurrentUser: boolean;
};

const ViewUserTabs: FC<ViewUserTabsProps> = ({ settings, isCurrentUser }) => {
    const { query, push } = useRouter();
    const resolvedQueryTab = typeof query.tab === 'string' ? query.tab : null;
    const [currentTab, setCurrentTab] = useState('0');

    const handleCurrentTabChange = useCallback(
        (event: React.SyntheticEvent, newValue: string) => {
            setCurrentTab(newValue);
            push({
                query: {
                    ...query,
                    tab: newValue,
                },
            });
        },
        [push, query],
    );

    const visibleTabs = tabs.filter(tab => {
        if (
            (tab.settingsKey && settings[tab.settingsKey]) ||
            (!tab.settingsKey && tab.authRequired === isCurrentUser)
        ) {
            return tab;
        }
    });

    useEffect(() => {
        if (
            query &&
            query.tab &&
            visibleTabs.some(tab => tab.value.toString() === resolvedQueryTab)
        ) {
            setCurrentTab(resolvedQueryTab ?? '0');
        } else push({ query: { ...query, tab: currentTab } });
    }, [currentTab, push, query, resolvedQueryTab, visibleTabs]);

    useEffect(() => {
        if (!visibleTabs.some(tab => tab.value.toString() === currentTab))
            setCurrentTab(visibleTabs[0]?.value.toString() ?? '0');
    }, [currentTab, visibleTabs]);

    return (
        <Paper className="theme-paper" sx={{ p: 2, my: 2 }}>
            <Typography variant="h4" className="special-text" textAlign="left">
                {settings.displayName}
            </Typography>
            <TabContext value={currentTab.toString()}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleCurrentTabChange}
                        aria-label="user page tabs"
                        textColor="inherit"
                        variant="scrollable"
                        allowScrollButtonsMobile
                    >
                        {(visibleTabs ?? []).map(tab => (
                            <Tab
                                key={tab.value}
                                label={tab.name}
                                value={tab.value.toString()}
                            />
                        ))}
                    </TabList>
                </Box>
                {visibleTabs.map(tab => (
                    <TabPanel key={tab.value} value={tab.value.toString()}>
                        <tab.component
                            userId={settings.userId}
                            isCurrentUser={isCurrentUser}
                        />
                    </TabPanel>
                ))}
            </TabContext>
        </Paper>
    );
};

export default ViewUserTabs;
