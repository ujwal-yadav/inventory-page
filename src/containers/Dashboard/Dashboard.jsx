import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import InventoryTable from '../../components/InventoryTable/InventoryTable';
import StatsCard from '../../components/StatsCard/StatsCard';
import { useDashboard } from './Dashboard.hooks';

export const Dashboard = () => {
  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('md'));

  const { statsData } = useDashboard();

  return (
    <Box sx={{ paddingX: isLargeView ? 8 : 2, paddingY: isLargeView ? 8 : 2 }}>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={isLargeView ? 4 : 2}
        paddingBottom={isLargeView ? 3 : 2}
      >
        {statsData?.length > 0 &&
          statsData?.map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
      </Box>
      <InventoryTable />
    </Box>
  );
};
