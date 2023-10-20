import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './leaflet.css';

const GeoLocalization = () => {
  const position = [-34.894409, -56.165718]
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-34.894509, -56.165718]}>
          <Popup>
            Balanza1
          </Popup>
        </Marker>

        <Marker position={[-34.874509, -56.165718]}>
          <Popup>
            Balanza2
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )

};

export default GeoLocalization;
