import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import logo from './spasi-sofia-logo.png';
import districts from './data/sofia-districts.json';
import { districtNames } from './data/sofia-districts-names';

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
import { topicsToPinsMap } from './data/pins-map';

const markerIcon = (topic) => {
  return L.icon({
    iconUrl: topicsToPinsMap.get(topic) || './pins/city-for-people.svg',
    iconSize: [36, 56],
  });
};

const mapQuarterIdToName = (id) => {
  if (id) {
    return districtNames.get(id);
  }
};

const showLogo = false;

function App() {
  const [{ projects, selected }, { setSelected }] = useProjects();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [regionName, setRegionName] = React.useState('');
  const [hoverId, setHoverId] = React.useState(null);

  return (
    <div className="App">
      {showLogo && (
        <Box className="logo">
          <Link href="https://spasi-sofia.org" isExternal>
            <img src={logo} alt="Спаси София" />
            <Text fontSize="10px" color="white" align="center" mt={'-12px'}>
              Някои от нашите проекти
            </Text>
          </Link>
        </Box>
      )}
      <Filters />
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          style={{
            height: '100%',
            maxHeight: '50vh',
            background: '#fff',
            color: '#1A202C',
          }}
        >
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
            <Flex
              shrink={0}
              direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
            >
              <Box flex={1} mr={4}>
                {selected.description}
                <Flex>
                  <Box flex={1} mr={4} fontSize={1}>
                    <Text fontSize="sm">
                      <em>{selected.tags}</em>
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                m={{ base: '0', sm: '0', md: '2', lg: '2' }}
                w={{
                  base: '100%',
                  sm: '100%',
                  md: '100%',
                  lg: '250px',
                }}
                flexBasis={{
                  base: '100%',
                  sm: '100%',
                  md: '250px',
                  lg: '250px',
                }}
              >
                {selected.imageUrl ? (
                  <Image
                    boxSize={{
                      base: '100%',
                      sm: '100%',
                      md: '100%',
                      lg: '250px',
                    }}
                    width={{
                      base: '100%',
                      sm: '100%',
                      md: '250px',
                      lg: '250px',
                    }}
                    objectFit="cover"
                    src={selected.imageUrl}
                    alt={selected.name}
                  />
                ) : (
                  <Image
                    boxSize={{
                      base: '100%',
                      sm: '100%',
                      md: '100%',
                      lg: '250px',
                    }}
                    width={{
                      base: '100%',
                      sm: '100%',
                      md: '250px',
                      lg: '250px',
                    }}
                    objectFit="cover"
                    src={'https://via.placeholder.com/250?text=SpasiSofia'}
                    alt={selected.name}
                  />
                )}
              </Box>
            </Flex>
          </DrawerBody>

          {selected.link && (
            <DrawerFooter justifyContent={'flex-start'}>
              <Button colorScheme="brand" style={{ color: '#fff' }}>
                <Link href={selected.link} isExternal>
                  Виж повече за проекта
                </Link>
              </Button>
            </DrawerFooter>
          )}
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
                  color: '#3E294D',
                  opacity: 0.8,
                  fillColor: '#4A2162',
                  fillOpacity: 0.14,
                  weight: 1,
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
                  icon={markerIcon(project.topic)}
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
