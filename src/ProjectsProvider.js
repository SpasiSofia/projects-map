import React from 'react';
import useMethods from 'use-methods';
import { useQuery } from 'react-query';
import { fetchProjects } from './ProjectsService';

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
