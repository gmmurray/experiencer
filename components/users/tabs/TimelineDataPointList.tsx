import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { TimelineDataPoint } from '../../../entities/TimelineTabSettings';

type TimelineDataPointListProps = {
    data: TimelineDataPoint[];
    onDelete: (index?: number | undefined) => Promise<void>;
    onSelect: (index: number, data: TimelineDataPoint) => void;
    isLoading: boolean;
};

const TimelineDataPointList: FC<TimelineDataPointListProps> = ({
    data,
    onDelete,
    onSelect,
    isLoading,
}) => {
    return (
        <List>
            {data.map((d, i) => (
                <Fragment key={i}>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => onDelete(i)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemButton
                            onClick={() => onSelect(i, d)}
                            disabled={isLoading}
                        >
                            <ListItemText
                                primary={d.title}
                                secondary={
                                    <Fragment>
                                        <Typography>{d.description}</Typography>
                                        <Typography>
                                            {new Date(
                                                d.date,
                                            ).toLocaleDateString()}
                                        </Typography>
                                    </Fragment>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                    {i !== data.length - 1 && <Divider />}
                </Fragment>
            ))}
        </List>
    );
};

export default TimelineDataPointList;
