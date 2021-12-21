import {
    DataPoint,
    DataPointTabSettings,
    UserTabKeys,
    modifyDataPoints,
} from './UserTabSetup';

import { OperationType } from '../lib/types/operationTypes';
import { UserPageSettings } from './UserPageSettings';

export class TimelineDataPoint implements DataPoint {
    constructor(
        public date: Date,
        public title: string,
        public description: string,
    ) {}
}

export class TimelineTabSettings implements DataPointTabSettings {
    constructor(public dataPoints: TimelineDataPoint[]) {}
}

export const modifyTimelineDataPoints = (
    settings: UserPageSettings,
    operation: OperationType,
    dataPoint?: TimelineDataPoint,
    index?: number,
): UserPageSettings => {
    return modifyDataPoints(
        UserTabKeys.TIMELINE,
        settings,
        operation,
        dataPoint,
        index,
    );
};
