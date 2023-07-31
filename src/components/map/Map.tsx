import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import style from './map.module.scss';
import Routing from '../routingMachine/RoutingMachine';

function Map(): JSX.Element {
  return (
    <MapContainer
      center={[59.9386300, 30.3141300]}
      zoom={10}
      scrollWheelZoom={false}
      className={style.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[59.9386300, 30.3141300]}>
        <Popup>
          Санкт-Петербург
        </Popup>
      </Marker>
      <Routing />
    </MapContainer>
  );
}

export default Map;
