import { useTheme } from '@emotion/react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

const StatsCard = ({ title, value, color }) => {
  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Paper
      sx={{
        padding: isLargeView ? 3 : 2,
        flex: 1,
        borderRadius: 2,
      }}
    >
      <Typography color={color} marginBottom={1} variant="h6">
        {title}
      </Typography>
      <Typography variant="h5" component={'h2'} fontWeight={'700'}>
        {value}
      </Typography>
    </Paper>
  );
};

export default StatsCard;
