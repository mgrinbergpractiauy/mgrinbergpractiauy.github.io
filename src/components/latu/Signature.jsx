import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Stack, Box, TextField,Grid } from '@mui/material';

const SignatureCapture = () => {
  const signatureRef = useRef(null);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const saveSignature = () => {
    if (signatureRef.current) {
      const signatureImage = signatureRef.current.toDataURL();
      console.log(signatureImage);

      const a = document.createElement('a');
      a.href = signatureImage;
      a.download = 'signature.png';
      a.click();
    }
  };

  useEffect(() => {
    // Ajusta la altura y el ancho del lienzo para que coincidan con el contenedor
    if (signatureRef.current) {
      const container = signatureRef.current.container;
      const canvas = signatureRef.current.getCanvas();
      canvas.style.height = '100%';
      canvas.style.width = '100%';
    }
  }, []);

  const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    marginBottom: '2%'
  };

  return (
    <div>
      <h6>Firma digital</h6>
      <div style={containerStyle}>
        <SignatureCanvas
          ref={signatureRef}
          backgroundColor="white"
          penColor="black"
        />
      </div>
     
      <Button variant="contained" fullWidth onClick={saveSignature}>
        Guardar
      </Button>

      <Box marginTop={2} />

      <Button variant="contained" fullWidth onClick={clearSignature}>
        Borrar
      </Button>
            
    </div>
  );
}

export default SignatureCapture;
