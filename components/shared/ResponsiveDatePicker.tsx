import {
    DesktopDatePicker,
    DesktopDatePickerProps,
    MobileDatePicker,
    MobileDatePickerProps,
} from '@mui/lab';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

const ResponsiveDatePicker = (
    props: MobileDatePickerProps | DesktopDatePickerProps,
) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isMobile) {
        return <MobileDatePicker {...props} />;
    }

    return <DesktopDatePicker {...props} />;
};

export default ResponsiveDatePicker;
