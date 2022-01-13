import * as React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes() {
  return (
    <Box width={435}>
      <Slider
        size="small"
        defaultValue={10}
        aria-label="Small"
        valueLabelDisplay="auto"
        min= {0}
        max = {10}
      />
    </Box>
  );
}