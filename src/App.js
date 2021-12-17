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
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Image,
  Link,
  Tag,
  HStack,
  Box,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import Filters from './Filters';
import { useProjects } from './ProjectsProvider';
import { SOFIA_GPS_CENTER } from './ProjectsService';
import './App.css';

// TODO Custom markers (even by project topic)
// var myIcon = L.icon({
//   iconUrl: 'https://cdn-icons.flaticon.com/png/512/2377/premium/2377922.png?token=exp=1636559881~hmac=29e4cb60da8c58e66b2b3a667960e2f8',
//   iconSize: [30, 30],
// });

const mapQuarterIdToName = (id) => {
  if (id) {
    return districtNames.get(id);
  }
};

function App() {
  const [{ projects, selected }, { setSelected }] = useProjects();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [regionName, setRegionName] = React.useState('');
  const [hoverId, setHoverId] = React.useState(null);

  return (
    <div className="App">
      <Box className="logo">
        <Link href="https://spasi-sofia.org" isExternal>
          <img src={logo} alt="Спаси София" />
          <Text fontSize="10px" color="white" align="center" mt={'-12px'}>
            Някои от нашите проекти
          </Text>
        </Link>
      </Box>
      <Filters />
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {selected.name}
            <Box mt={1}>
              <HStack spacing={4}>
                {selected.categories &&
                  selected.categories.map((category) => (
                    <Tag key={category}>{category}</Tag>
                  ))}
              </HStack>
            </Box>
          </DrawerHeader>

          <DrawerBody>
            <Flex shrink={0}>
              <Box flex={1} mr={4}>
                {' '}
                {selected.description}
              </Box>
              <Box w="200px" flexBasis="200px">
                <Image
                  boxSize="200px"
                  width="200px"
                  objectFit="cover"
                  src={selected.imageUrl}
                  alt={selected.name}
                />
              </Box>
            </Flex>
          </DrawerBody>

          <DrawerFooter justifyContent={'flex-start'}>
            <Button colorScheme="brand">
              <Link href={selected.link} isExternal>
                Виж проекта в сайта на Спаси София
              </Link>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="map">
        <MapContainer
          center={SOFIA_GPS_CENTER}
          zoom={12}
          scrollWheelZoom={true}
        >
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
                setRegionName(
                  mapQuarterIdToName(e.layer.feature.properties.id)
                );
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
    </div>
  );
}

export default App;
