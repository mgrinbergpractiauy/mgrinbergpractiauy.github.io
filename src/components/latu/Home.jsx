import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Button, Stack, Box, TextField,Grid } from '@mui/material';
import InstrumentsServ from "../../services/instrumentsService";

const  HomePage = () => {
  const { token, user } = useParams();  
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <TextField label="Texto1" variant="outlined" fullWidth />
      <Box mt={2} />
      <TextField label="Texto2" variant="outlined" fullWidth />
      <Box mt={2} />
      <TextField label="Texto3" variant="outlined" fullWidth />
      <Box mt={2} />
      <Button variant="contained" fullWidth>
        Click
      </Button>
    </Box>
  );
};

export default HomePage;
    
 