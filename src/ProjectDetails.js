import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

function ProjectDetails({ project }) {
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
    </Flex>
  );
}

export default ProjectDetails;
