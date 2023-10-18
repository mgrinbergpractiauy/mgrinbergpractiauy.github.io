import { DecodeHintType, useZxing } from "react-zxing";
import { useState, useEffect } from "react";

const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [devices, setDevices] = useState([]);
  const [deviceIds, setDeviceIds] = useState([]);

  useEffect(() => {
    const initializeDevices = async () => {
      try {
        const availableDevices = await navigator.mediaDevices.enumerateDevices();
        const availableVideoDevices = availableDevices.filter(
          (device) => device.kind === 'videoinput'
        );

        if (availableVideoDevices.length === 0) {
          // Maneja el caso en el que no se encuentren cámaras.
          console.log('No cameras found');
        } else {
          // Utiliza todos los IDs de cámaras encontrados.
          const selectedDeviceIds = availableVideoDevices.map(device => device.deviceId);
          setDeviceIds(selectedDeviceIds);
        }
      } catch (error) {
        // Maneja el error, esto podría deberse a problemas de permisos.
        console.error('Failed to find cameras. This could be a permissions problem', error);
      }
    };

    initializeDevices();
  }, []);

  const hints = {
    // Array de todos los formatos disponibles
    POSSIBLE_FORMATS: [
      'AZTEC',
      'CODABAR',
      'CODE_39',
      'CODE_93',
      'CODE_128',
      'DATA_MATRIX',
      'EAN_8',
      'EAN_13',
      'ITF',
      'MAXICODE',
      'PDF_417',
      'QR_CODE',
      'RSS_14',
      'RSS_EXPANDED',
      'UPC_A',
      'UPC_E',
      'UPC_EAN_EXTENSION',
    ],
  };

  const { ref } = useZxing({
    deviceId: deviceIds, // Cambia deviceId a un arreglo de IDs
    timeBetweenDecodingAttempts:10000,
    constraints:{ video: { facingMode: 'environment' }, audio: false },
    onDecodeResult: (decodedResult) => {
      setResult(decodedResult.getText());
    },
    onDecodeError: (decodedError) => {
        setResult(decodedError.message);    
    },
    onError: (error) => {
        setResult(error);
    },onResult(newScan) {
        setScan(newScan);
    }   
  });

  return (
    <div>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
};

export default BarcodeScanner;

