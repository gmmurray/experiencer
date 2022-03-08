import {
    Button,
    Divider,
    Grid,
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
import { addhttp } from '../../../util/addHttp';
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
                            sx={{ width: '100%' }}
                        >
                            <ListItemText
                                disableTypography
                                secondary={
                                    <Fragment>
                                        <Grid container>
                                            <Grid item xs={12} md={3}>
                                                <Typography variant="overline">
                                                    title
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="white"
                                                >
                                                    {d.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <Typography variant="overline">
                                                    description
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="white"
                                                    noWrap
                                                >
                                                    {d.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Fragment>
                                                {!isNullOrEmptyString(
                                                    d.firstLinkTo,
                                                ) &&
                                                    !isNullOrEmptyString(
                                                        d.firstLinkText,
                                                    ) && (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                        >
                                                            <Typography variant="overline">
                                                                first link
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                color="white"
                                                            >
                                                                {
                                                                    d.firstLinkText
                                                                }
                                                            </Typography>
                                                            <Button
                                                                href={addhttp(
                                                                    d.firstLinkTo,
                                                                )}
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                            >
                                                                {d.firstLinkTo}
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                {!isNullOrEmptyString(
                                                    d.secondLinkTo,
                                                ) &&
                                                    !isNullOrEmptyString(
                                                        d.secondLinkText,
                                                    ) && (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                        >
                                                            <Typography variant="overline">
                                                                second link
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                color="white"
                                                            >
                                                                {
                                                                    d.secondLinkText
                                                                }
                                                            </Typography>
                                                            <Button
                                                                href={addhttp(
                                                                    d.secondLinkTo,
                                                                )}
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                            >
                                                                {d.secondLinkTo}
                                                            </Button>
                                                        </Grid>
                                                    )}
                                            </Fragment>
                                        </Grid>
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
