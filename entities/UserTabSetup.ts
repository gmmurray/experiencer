import { UserPageSettings } from './UserPageSettings';

export type UserTabKey = 'timeline' | 'experiences' | 'github';

export interface TimelineDataPoint {
    date: Date;
    title: string;
    description: string;
}

export interface TimelineTabSettings {
    dataPoints: TimelineDataPoint[];
}

export interface UserTabSetup extends Record<UserTabKey, any> {
    timeline: TimelineTabSettings | undefined;
}

const addDataPoint = (
    dataPoints: TimelineDataPoint[],
    newDataPoint?: TimelineDataPoint,
): TimelineDataPoint[] => {
    let result = [...dataPoints];
    if (newDataPoint) {
        result = [...result, newDataPoint];
    }
    return result;
};

const updateDataPoint = (
    dataPoints: TimelineDataPoint[],
    updatedDataPoint?: TimelineDataPoint,
    index?: number,
): TimelineDataPoint[] => {
    if (updatedDataPoint && index !== null && index !== undefined) {
        dataPoints[index] = updatedDataPoint;
    }
    return [...dataPoints];
};

const deleteDataPoint = (
    dataPoints: TimelineDataPoint[],
    index?: number,
): TimelineDataPoint[] => {
    let result = [...dataPoints];
    if (index !== null && index !== undefined) {
        result = result.filter((dp, i) => i !== index);
    }
    return result;
};

export const modifyTimelineDataPoints = (
    settings: UserPageSettings,
    operation: 'add' | 'update' | 'delete',
    dataPoint?: TimelineDataPoint,
    index?: number,
): UserPageSettings => {
    const { tabSetup: { timeline: { dataPoints = [] } = {} } = {} } = settings;

    let modifiedDataPoints;
    switch (operation) {
        case 'add':
            modifiedDataPoints = addDataPoint(dataPoints, dataPoint);
            break;
        case 'update':
            modifiedDataPoints = updateDataPoint(dataPoints, dataPoint, index);
            break;
        case 'delete':
            modifiedDataPoints = deleteDataPoint(dataPoints, index);
            break;
    }

    return {
        ...settings,
        tabSetup: {
            ...settings.tabSetup,
            timeline: {
                ...settings.tabSetup.timeline,
                dataPoints: modifiedDataPoints,
            },
        },
    };
};
