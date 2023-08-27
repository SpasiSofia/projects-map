import React from 'react';

import { Image, Box, Flex, Text } from '@chakra-ui/react';

function ProjectDetails({ project }) {
  const [imgUrl, setImgUrl] = React.useState(
    'https://via.placeholder.com/250?text=SpasiSofia'
  );
  Promise.resolve(project.imageUrl).then((url) => {
    if (url) {
      setImgUrl(url);
    }
  });

  return (
    <Flex
      shrink={0}
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
    >
      <Box flex={1} mr={4}>
        {project.description}
        <Flex>
          <Box flex={1} mr={4} fontSize={1}>
            <Text fontSize="sm">
              <em>{project.tags}</em>
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
          src={imgUrl}
          alt={project.name}
        />
      </Box>
    </Flex>
  );
}

export default ProjectDetails;
