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
import { useSearchParams } from 'react-router-dom';

import { topics } from './data/topics';
import { years } from './data/years';
import { districtOptions } from './data/sofia-districts-names';
import { theme } from './theme';

// function useUrlQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }
const Filters = () => {
  let [, setSearchParams] = useSearchParams();

  const [{ filter, projects }, { setFilters }] = useProjects();

  const [filterYears, setFilterYears] = React.useState(filter.years);
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
    setSearchParams({
      years: filterYears.join('&'),
      topics: filterTopics.map((t) => t.value).join('&'),
      districts: filterDistricts.map((d) => d.value).join('&'),
    });

    setFilters({
      years: filterYears,
      topics: filterTopics,
      districts: filterDistricts,
    });
  };

  const clearFilters = () => {
    setFilterYears([]);
    setFilterTopics([]);
    setFilterDistricts([]);
    setSearchParams({
      years: [],
      topics: [],
      districts: [],
    });

    setFilters({
      years: [],
      topics: [],
      districts: [],
    });
  };

  return (
    <Box pos="absolute" top="4" right="4" zIndex="800">
      <Popover>
        <PopoverTrigger>
          <Button
            color="white"
            background="brand.900"
            _hover={{
              background: 'ssyellow.500',
              color: 'white',
            }}
          >
            <Icon as={FiFilter} w={5} h={5} m={2} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>
            <Text textAlign="left" fontWeight={'bold'}>
              Филтриране на проектите(
              {projects && projects.length})
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
              defaultValue={filter.districts}
              placeholder="Изберете район"
              theme={theme.brand}
            />
            <Text textAlign="left" mt={4} mb="8px">
              Изберете една или няколко години
            </Text>

            <HStack
              wrap={'wrap'}
              spacing="12px"
              justify={'start'}
              isInline={true}
            >
              {years.map((year) => (
                <Button
                  key={year}
                  colorScheme="gray"
                  size="xs"
                  my={1}
                  isActive={filterYears && filterYears.includes(year)}
                  onClick={() => onYearChange(year)}
                  color="white"
                  background="gray.400"
                  _hover={{
                    background: 'ssyellow.500',
                    color: 'white',
                  }}
                  _active={{
                    background: 'brand.900',
                    color: 'white',
                  }}
                  style={{
                    margin: '10px 4px 0 0',
                  }}
                >
                  {year}
                </Button>
              ))}
            </HStack>

            <Text textAlign="left" mt={4} mb="8px">
              Изберете тема
            </Text>
            <Select
              options={topics}
              isMulti
              placeholder="Изберете тема"
              defaultValue={filterTopics}
              variant="brand"
              onChange={onTopicChange}
            />
            <Button
              w={'100%'}
              mt={6}
              mb={0}
              onClick={applyFilters}
              color="white"
              background="brand.900"
              _hover={{
                background: 'ssyellow.500',
                color: 'white',
              }}
            >
              Приложете филтрите
            </Button>
            <Button
              w={'100%'}
              mt={2}
              mb={4}
              onClick={clearFilters}
              color="white"
              background="gray.400"
              _hover={{
                background: 'ssyellow.300',
                color: 'white',
              }}
            >
              Изчистете филтрите
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
export default Filters;
