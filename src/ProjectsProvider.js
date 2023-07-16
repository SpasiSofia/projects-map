import React from 'react';
import useMethods from 'use-methods';
import { useQuery } from 'react-query';
import { filterProjects } from './ProjectsService';
import { useSearchParams } from 'react-router-dom';
import { PROJECTS as STATIC_PROJECTS } from './data/static-projects.js';
import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';

const BASE_URL = 'https://spasisofia.org';

const ProjectsContext = React.createContext(null);

const INITIAL_STATE = {
  projects: [],
  selected: {},
  filter: {
    years: [],
    topics: [],
    districts: [],
  },
};

export const useProjects = () => {
  const context = React.useContext(ProjectsContext);

  if (context === null) {
    throw new Error('useTasks must be within TasksProvider');
  }

  return context;
};

const prepareStaticProjects = (projects) => {
  return projects.map((el) => {
    return {
      id: uuidv4(),
      name: el.name,
      description: el.description,
      imageUrl: el.imageUrl,
      link: el.link ? BASE_URL + el.link : el.link,
      tags: el.tags,
      topic: el.topic,
      quarter: el.quarter,
      coordinates: [
        Number(el.gps.split(',')[0]),
        Number(el.gps.split(',')[1].trim()),
      ],
      date: format(
        parse('', '', new Date(el.timestamp.replace(' ', 'T'))),
        'dd.mm.yyyy'
      ),
      type: el.type,
    };
  });
};


export const ProjectsProvider = ({ children }) => {
  let [searchParams] = useSearchParams();

  const [mapTopicIdToTopic, setMapTopicIdToTopic] = React.useState(null);
  React.useEffect(() =>
    fetch(`${BASE_URL}/wp-json/wp/v2/project-category/`)
      .then(res => res.json())
      .then(data => setMapTopicIdToTopic(new Map(data.map(obj => [obj.id, obj.name]))))
    , []);

  const [wordpressProjectsRaw, setWordpressProjectsRaw] = React.useState([]);
  React.useEffect(() => fetch(`${BASE_URL}/wp-json/wp/v2/projects`)
    .then(res => res.json())
    .then(data => setWordpressProjectsRaw(data.filter(el => el.acf && el.acf.map))),
    []);

  const [wordpressProjects, setWordpressProjects] = React.useState([]);
  React.useEffect(() =>
    setWordpressProjects(wordpressProjectsRaw.map(el => Object({
      id: uuidv4(),
      name: el.title.rendered,
      description: '',
      imageUrl: el.featured_media
        ? fetch(`${BASE_URL}/wp-json/wp/v2/media/${el.featured_media}`)
          .then(res => res.json())
          .then(data => data.media_details.sizes.large.source_url)
          .catch(() => null)
        : null,
      link: el.link,
      tags: [],
      topic: el['project-category'].length > 0 && mapTopicIdToTopic
        ? mapTopicIdToTopic.get(el['project-category'].at(0))
        : null,
      quarter: '',
      coordinates: [Number(el.acf.map.lat), Number(el.acf.map.lng)],
      date: el.date,
    }))), [wordpressProjectsRaw, mapTopicIdToTopic]);

  const yearsParams = searchParams.get('years');
  const topicsParams = searchParams.get('topics');
  const districtsParams = searchParams.get('districts');

  if (yearsParams) {
    let years = yearsParams.split('&').map((y) => parseInt(y));
    INITIAL_STATE.filter.years = years;
  }

  if (topicsParams) {
    let topics = topicsParams.split('&').map((e) => {
      return { value: e, label: e };
    });
    INITIAL_STATE.filter.topics = topics;
  }

  if (districtsParams) {
    let districts = districtsParams.split('&').map((e) => {
      return { value: e, label: e };
    });
    INITIAL_STATE.filter.districts = districts;
  }

  const [reducerState, callbacks] = useMethods(methods, INITIAL_STATE);

  const projectsQuery = useQuery(
    ['projects', reducerState.filter, wordpressProjects],
    () => filterProjects(
      [...prepareStaticProjects(STATIC_PROJECTS), ...wordpressProjects],
      { ...reducerState.filter }
    ),
    {
      keepPreviousData: true,
    }
  );

  const state = {
    ...reducerState,
    projects: projectsQuery.data,
  };

  return (
    <ProjectsContext.Provider value={[state, callbacks]} children={children} />
  );
};

export default ProjectsProvider;

const methods = (state) => ({
  setFilters: (filter) => {
    state.filter = { ...state.filter, ...filter };
  },
  setSelected: (project) => {
    state.selected = { ...project };
  },
});
