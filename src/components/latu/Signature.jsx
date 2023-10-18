import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

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
      <h1>Signature Capture</h1>
      <div style={containerStyle}>
        <SignatureCanvas
          ref={signatureRef}
          backgroundColor="white"
          penColor="black"
        />
      </div>
     
      <button onClick={clearSignature}>Clear Signature</button>
      <button onClick={saveSignature}>Save Signature</button>
    </div>
  );
}

export default SignatureCapture;
