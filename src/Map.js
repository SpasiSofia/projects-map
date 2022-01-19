import React from 'react';
import logo from './spasi-sofia-logo.png';
import districts from './data/sofia-districts.json';
import { districtNames } from './data/sofia-districts-names';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import { useDisclosure } from '@chakra-ui/react';

import Filters from './Filters';
import { useProjects } from './ProjectsProvider';
import { SOFIA_GPS_CENTER } from './ProjectsService';
import './App.css';

// TODO Custom markers (even by project topic)
// var myIcon = L.icon({
//   iconUrl: 'https://cdn-icons.flaticon.com/png/512/2377/premium/2377922.png?token=exp=1636559881~hmac=29e4cb60da8c58e66b2b3a667960e2f8',
//   iconSize: [30, 30],
// });

function MyLocation() {
  // const map = useMap();
  // console.log('map center:', map.getCenter());
  const map = useMap();
  React.useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  map.on('locationfound', onLocationFound);

  return null;
}

function onLocationFound(e, map) {
  console.log(e, map);
  const latlang = e.latlng;
  const radius = e.accuracy + 109;

  L.circle(latlang, radius).addTo(e.target);
}

const mapQuarterIdToName = (id) => {
  if (id) {
    return districtNames.get(id);
  }
};

function Map() {
  const [{ projects, selected }, { setSelected }] = useProjects();
  const { onOpen } = useDisclosure();
  // const btnRef = React.useRef();

  const [regionName, setRegionName] = React.useState('');
  const [hoverId, setHoverId] = React.useState(null);

  return (
    <div className="map">
      <MapContainer center={SOFIA_GPS_CENTER} zoom={12} scrollWheelZoom={true}>
        <MyLocation />

        <TileLayer
          attribution='Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON
          style={(feature) => {
            if (hoverId === feature.properties.id) {
              return {
                color: '#90CDF4',
                opacity: 0.8,
                fillColor: '#90CDF4',
                fillOpacity: 0.3,
              };
            } else {
              return {
                color: '#718096',
                opacity: 0.1,
                fillColor: '#BEE3F8',
                fillOpacity: 0,
              };
            }
          }}
          eventHandlers={{
            mouseover: (e) => {
              setRegionName(mapQuarterIdToName(e.layer.feature.properties.id));
              setHoverId(e.layer.feature.properties.id);
            },
          }}
          attribution="София План"
          data={districts}
        >
          <Tooltip sticky>{regionName}</Tooltip>
        </GeoJSON>
        <MarkerClusterGroup showCoverageOnHover={false}>
          {projects &&
            projects.map((project) => (
              <Marker
                position={project.coordinates}
                key={project.id}
                // icon={myIcon}
                eventHandlers={{
                  click: () => {
                    setSelected(projects.find((p) => p.id === project.id));
                    onOpen();
                  },
                }}
              >
                <Tooltip>{project.name}</Tooltip>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default Map;
