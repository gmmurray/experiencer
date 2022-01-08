import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Text,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Divider, Paper, Typography, useTheme } from '@mui/material';

import { FC } from 'react';

const AxisTick = ({ payload: { value }, ...props }: any) => (
    <Text {...props} className="chart-axis-text">
        {value}
    </Text>
);

const ChartTooltip = ({ payload, label }: any) => (
    <Paper elevation={2} sx={{ minWidth: 100, textAlign: 'left', p: 2 }}>
        <Typography variant="button">{label}</Typography>
        <Divider sx={{ my: 1 }} />
        {payload![0].value}{' '}
        {payload![0].value === 1 ? 'repository' : 'repositories'}
    </Paper>
);

type GithubUserLanguagesProps = {
    data: { [language: string]: number };
};

const GithubUserLanguages: FC<GithubUserLanguagesProps> = ({ data }) => {
    const theme = useTheme();
    const chartData = Object.keys(data)
        .sort((a, b) => (a > b ? 1 : -1))
        .map(key => ({
            name: key,
            value: data[key],
        }));
    return (
        <ResponsiveContainer height={300} width="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid />
                <XAxis type="number" tick={props => <AxisTick {...props} />} />
                <YAxis
                    type="category"
                    dataKey="name"
                    tick={props => <AxisTick {...props} />}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.48)' }}
                    content={({ active, ...props }) =>
                        active && <ChartTooltip {...props} />
                    }
                />
                <Bar dataKey="value" fill={theme.palette.primary.main} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GithubUserLanguages;
