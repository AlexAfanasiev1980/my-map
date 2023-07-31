import { useEffect } from 'react';
import 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useAppSelector } from '../../redux/hooks';
declare let L: {
  Routing: {
    control: (arg0: { waypoints: any[]; routeWhileDragging: boolean }) => {
      (): any;
      new (): any;
      addTo: { (arg0: L.Map): any; new (): any };
    };
  };
  latLng: (arg0: number, arg1: number) => any;
};

export default function Routing(): null {
  const map = useMap();
  // получаем точки маршрута из store
  const { coordinates } = useAppSelector((state) => state.coordinates);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!map) return;

    const coordinatesMap = coordinates.map((el) => L.latLng(el[0], el[1]));

    const routingControl = L.Routing.control({
      waypoints: coordinatesMap,
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, coordinates]);

  return null;
}