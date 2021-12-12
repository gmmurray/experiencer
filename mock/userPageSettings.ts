import { UserPageSettings } from '../entities/UserPageSettings';
import { createRandomString } from '../util/randomString';

export const mockUserPageSettings: UserPageSettings[] = [
    {
        _id: createRandomString(),
        userId: '61b0f738f4a99fc783ad418d',
        enableTimeline: true,
        enableExperiences: true,
        enableGithub: true,
    },
];
