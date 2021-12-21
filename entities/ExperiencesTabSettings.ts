import {
    DataPoint,
    DataPointTabSettings,
    UserTabKeys,
    modifyDataPoints,
} from './UserTabSetup';

import { OperationType } from '../lib/types/operationTypes';
import { UserPageSettings } from './UserPageSettings';
import { isNullOrEmptyString } from '../forms/validation';

export class ExperiencesDataPoint implements DataPoint {
    constructor(
        public title: string,
        public description: string,
        public firstLinkTo?: string,
        public firstLinkText?: string,
        public secondLinkTo?: string,
        public secondLinkText?: string,
    ) {}
}

export class ExperiencesTabSettings implements DataPointTabSettings {
    constructor(public dataPoints: ExperiencesDataPoint[]) {}
}

export const cleanExperiencesDataPoints = (
    dataPoints: ExperiencesDataPoint[],
) =>
    dataPoints.map(dp => ({
        ...dp,
        firstLinkText: isNullOrEmptyString(dp.firstLinkTo)
            ? undefined
            : dp.firstLinkText,
        secondLinkText: isNullOrEmptyString(dp.secondLinkTo)
            ? undefined
            : dp.secondLinkText,
    }));

export const modifyExperiencesDataPoints = (
    settings: UserPageSettings,
    operation: OperationType,
    dataPoint?: ExperiencesDataPoint,
    index?: number,
): UserPageSettings => {
    const modifiedSettings = modifyDataPoints(
        UserTabKeys.EXPERIENCES,
        settings,
        operation,
        dataPoint,
        index,
    );
    return {
        ...modifiedSettings,
        tabSetup: {
            ...modifiedSettings.tabSetup,
            [UserTabKeys.EXPERIENCES]: {
                ...modifiedSettings.tabSetup[UserTabKeys.EXPERIENCES],
                dataPoints: cleanExperiencesDataPoints(
                    modifiedSettings.tabSetup[UserTabKeys.EXPERIENCES]
                        .dataPoints,
                ),
            },
        },
    };
};
