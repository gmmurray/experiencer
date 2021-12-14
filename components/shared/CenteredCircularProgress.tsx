import { CircularProgress, Grid } from '@mui/material';

import { FC } from 'react';

type CenteredCircularProgressProps = {
    minHeight?: string | number;
};

const CenteredCircularProgress: FC<CenteredCircularProgressProps> = ({
    minHeight = '100vh',
}) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight }}
        >
            <Grid item xs={3}>
                <CircularProgress />
            </Grid>
        </Grid>
    );
};

export default CenteredCircularProgress;
