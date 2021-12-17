import React from 'react';
import useMethods from 'use-methods';
import { useQuery } from 'react-query';
import { fetchProjects } from './ProjectsService';
import { useSearchParams } from 'react-router-dom';

const TasksContext = React.createContext(null);

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
  const context = React.useContext(TasksContext);

  if (context === null) {
    throw new Error('useTasks must be within TasksProvider');
  }

  return context;
};

export const ProjectsProvider = ({ children }) => {
  let [searchParams, setSearchParams] = useSearchParams();

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
    ['projects', reducerState.filter],
    () => fetchProjects({ ...reducerState.filter }),
    {
      keepPreviousData: true,
    }
  );

  const state = {
    ...reducerState,
    projects: projectsQuery.data,
  };

  return (
    <TasksContext.Provider value={[state, callbacks]} children={children} />
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
