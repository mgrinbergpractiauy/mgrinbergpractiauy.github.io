import * as React from 'react';
import { Grid, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

import ListSharpIcon from '@mui/icons-material/ListSharp';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import QrCode2SharpIcon from '@mui/icons-material/QrCode2Sharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp';

import HomePage from "../../latu/Home";
import BarcodeScanner from "../../latu/BarCode";
import SignatureCapture from "../../latu/Signature";
import Map from '../../latu/geo/Map';

const Navigation=() => {
  const [value, setValue] = React.useState("form");

  return (
    <div>
    <Grid container justifyContent="center">
    <Grid item xs={12} sm={6} md={4}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="formulario" value="form" icon={<ListSharpIcon />} />
        <BottomNavigationAction label="firma" value="sign" icon={<CreateSharpIcon />} />
        <BottomNavigationAction label="Código barras" value="barcode" icon={<QrCode2SharpIcon />} />        
        <BottomNavigationAction label="Mapa" value="geo" icon={<FmdGoodSharpIcon />} />
      </BottomNavigation>

      <Box marginTop={2}>
        {value === 'form' && <HomePage />}
        {value === 'sign' && <SignatureCapture />}
        {value === 'barcode' && <BarcodeScanner />}
        {value === 'geo' && <Map />}
      </Box> 

    </Grid>
  </Grid>
  
  </div>
  );
}

export default Navigation;