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
    timeline: TimelineTabSettings;
}
