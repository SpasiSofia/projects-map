import React from 'react';
import {
  Icon,
  Button,
  HStack,
  Box,
  Text,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import Select from 'react-select';
import { useProjects } from './ProjectsProvider';

import { topics } from './data/topics';
import { districtOptions } from './data/sofia-districts-names';

const Filters = () => {
  const [{ projects }, { setFilters }] = useProjects();

  const [filterYears, setFilterYears] = React.useState([]);
  const [filterTopics, setFilterTopics] = React.useState([]);
  const [filterDistricts, setFilterDistricts] = React.useState([]);

  const onDistrictChange = (value) => {
    setFilterDistricts(value);
  };

  const onTopicChange = (value) => {
    setFilterTopics(value);
  };

  const onYearChange = (value) => {
    if (filterYears.includes(value)) {
      setFilterYears(filterYears.filter((y) => y !== value));
    } else {
      setFilterYears([...filterYears, value]);
    }
  };

  const applyFilters = () => {
    setFilters({
      years: filterYears,
      topics: filterTopics,
      districts: filterDistricts,
    });
  };

  return (
    <Box pos="absolute" top="4" right="4" zIndex="800">
      <Popover>
        <PopoverTrigger>
          <Button color="white" background="blue.500">
            <Icon as={FiFilter} w={5} h={5} m={2} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>
            <Text textAlign="left" fontWeight={'bold'}>
              Филтриране на проектите({projects && projects.length})
            </Text>
          </PopoverHeader>
          <PopoverBody>
            <Text textAlign="left" mt={1} mb="8px">
              Изберете един или няколко района
            </Text>
            <Select
              options={districtOptions}
              onChange={onDistrictChange}
              isMulti
              placeholder="Изберете район"
            />
            <Text textAlign="left" mt={4} mb="8px">
              Изберете една или няколко години
            </Text>

            <HStack wrap={'wrap'} spacing="12px">
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2015)}
                onClick={() => onYearChange(2015)}
              >
                2015
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2016)}
                onClick={() => onYearChange(2016)}
              >
                2016
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears.includes(2017)}
                onClick={() => onYearChange(2017)}
              >
                2017
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2018)}
                onClick={() => onYearChange(2018)}
              >
                2018
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2019)}
                onClick={() => onYearChange(2019)}
              >
                2019
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2020)}
                onClick={() => onYearChange(2020)}
              >
                2020
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2021)}
                onClick={() => onYearChange(2021)}
              >
                2021
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                my={1}
                isActive={filterYears && filterYears.includes(2022)}
                onClick={() => onYearChange(2022)}
              >
                2022
              </Button>
            </HStack>

            <Text textAlign="left" mt={4} mb="8px">
              Изберете тема
            </Text>
            <Select
              options={topics}
              isMulti
              placeholder="Изберете тема"
              onChange={onTopicChange}
            />
            <Button w={'100%'} mt={6} mb={4} onClick={applyFilters}>
              Приложете филтрите
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
export default Filters;