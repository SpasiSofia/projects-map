import React from 'react';
import logo from './spasi-sofia-logo.png';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
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
import { useProjects } from './ProjectsProvider';
import './App.css';
import L from 'leaflet';

// TODO Custom markers (even by project topic)
// var myIcon = L.icon({
//   iconUrl: 'https://cdn-icons.flaticon.com/png/512/2377/premium/2377922.png?token=exp=1636559881~hmac=29e4cb60da8c58e66b2b3a667960e2f8',
//   iconSize: [30, 30],
// });

function App() {
  const [{ projects, selected }, { setSelected }] = useProjects();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
          center={[42.698334, 23.319941]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          />

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
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
