import * as React from 'react';
import { Grid, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Navigation=() => {
  const [value, setValue] = React.useState(0);

  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} sm={6} md={4}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>

      <Box marginTop={2} />

    </Grid>
  </Grid>
  );
}

export default Navigation;