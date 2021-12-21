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
import { ExperiencesDataPoint } from '../../../entities/ExperiencesTabSettings';
import { isNullOrEmptyString } from '../../../forms/validation';

type ExperienceDataPointListProps = {
    data: ExperiencesDataPoint[];
    onDelete: (index?: number) => Promise<void>;
    onSelect: (index: number, data: ExperiencesDataPoint) => void;
    isLoading: boolean;
};

const ExperienceDataPointList: FC<ExperienceDataPointListProps> = ({
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
                                        {!isNullOrEmptyString(d.firstLinkTo) &&
                                            !isNullOrEmptyString(
                                                d.firstLinkText,
                                            ) && (
                                                <Fragment>
                                                    <Typography>
                                                        first link
                                                    </Typography>
                                                    <ul>
                                                        <li>
                                                            {d.firstLinkText}
                                                        </li>
                                                        <li>{d.firstLinkTo}</li>
                                                    </ul>
                                                </Fragment>
                                            )}
                                        {!isNullOrEmptyString(d.secondLinkTo) &&
                                            !isNullOrEmptyString(
                                                d.secondLinkText,
                                            ) && (
                                                <Fragment>
                                                    <Typography>
                                                        second link
                                                    </Typography>
                                                    <ul>
                                                        <li>
                                                            {d.secondLinkText}
                                                        </li>
                                                        <li>
                                                            {d.secondLinkTo}
                                                        </li>
                                                    </ul>
                                                </Fragment>
                                            )}
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

export default ExperienceDataPointList;
