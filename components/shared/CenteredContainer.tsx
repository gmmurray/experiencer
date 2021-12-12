import { Container } from '@mui/material';
import { FC } from 'react';

const CenteredContainer: FC = ({ children }) => (
    <Container sx={{ textAlign: 'center', pt: 5 }}>{children}</Container>
);

export default CenteredContainer;
