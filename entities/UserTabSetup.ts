import { OperationType, OperationTypes } from '../lib/types/operationTypes';

import { ExperiencesTabSettings } from './ExperiencesTabSettings';
import { TimelineTabSettings } from './TimelineTabSettings';
import { UserPageSettings } from './UserPageSettings';

export type UserTabKey = 'timeline' | 'experiences' | 'github';
export const UserTabKeys: Record<string, UserTabKey> = {
    TIMELINE: 'timeline',
    EXPERIENCES: 'experiences',
    GITHUB: 'github',
};

export interface UserTabSetup extends Record<UserTabKey, any> {
    timeline: TimelineTabSettings | undefined;
    experiences: ExperiencesTabSettings | undefined;
}

export interface DataPoint extends Record<string, any> {}

export interface DataPointTabSettings {
    dataPoints: DataPoint[];
}

const addDataPoint = (
    dataPoints: DataPoint[],
    newDataPoint?: DataPoint,
): DataPoint[] => {
    let result = [...dataPoints];
    if (newDataPoint) {
        result = [...result, newDataPoint];
    }
    return result;
};

const updateDataPoint = (
    dataPoints: DataPoint[],
    updatedDataPoint?: DataPoint,
    index?: number,
): DataPoint[] => {
    if (updatedDataPoint && index !== null && index !== undefined) {
        dataPoints[index] = updatedDataPoint;
    }
    return [...dataPoints];
};

const deleteDataPoint = (
    dataPoints: DataPoint[],
    index?: number,
): DataPoint[] => {
    let result = [...dataPoints];
    if (index !== null && index !== undefined) {
        result = result.filter((dp, i) => i !== index);
    }
    return result;
};

export const modifyDataPoints = (
    tab: UserTabKey,
    settings: UserPageSettings,
    operation: OperationType,
    dataPoint?: DataPoint,
    index?: number,
): UserPageSettings => {
    const { tabSetup: { [tab]: { dataPoints = [] } = {} } = {} } = settings;

    let modifiedDataPoints;
    switch (operation) {
        case OperationTypes.ADD:
            modifiedDataPoints = addDataPoint(dataPoints, dataPoint);
            break;
        case OperationTypes.UPDATE:
            modifiedDataPoints = updateDataPoint(dataPoints, dataPoint, index);
            break;
        case OperationTypes.DELETE:
            modifiedDataPoints = deleteDataPoint(dataPoints, index);
            break;
        default:
            modifiedDataPoints = dataPoints;
            break;
    }

    return {
        ...settings,
        tabSetup: {
            ...settings.tabSetup,
            [tab]: {
                ...settings.tabSetup[tab],
                dataPoints: modifiedDataPoints,
            },
        },
    };
};
