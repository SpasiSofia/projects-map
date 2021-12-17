import { PROJECTS } from './data/static-projects.js';
import { v4 as uuidv4 } from 'uuid';

export const SOFIA_GPS_CENTER = [42.698334, 23.319941];
export const fetchProjects = async (filter) => {
  let smallProjects = [];

  // https://benborgers.com/posts/google-sheets-json
  await fetch(
    'https://opensheet.vercel.app/1-4jrHfL_nJex6gt2VMIaj2TP-f-xAhFo12iVlCSK2sQ/projectslist'
  )
    .then((response) => response.json())
    .then((data) => {
      smallProjects = data
        .filter((project) => project.timestamp)
        .map((el) => {
          return {
            id: uuidv4(),
            name: el.name,
            description: el.description,
            imageUrl: el.imageUrl,
            link: el.link,
            tags: el.tags ? el.tags.split(',') : [],
            topic: el.topic,
            quarter: el.quarter,
            coordinates:
              el.gpsLat & el.gpsLon
                ? [Number(el.gpsLat), Number(el.gpsLon)]
                : SOFIA_GPS_CENTER,
            date: el.date,
          };
        });
    });

  let projects = [...PROJECTS, ...smallProjects];

  if (filter.years.length > 0) {
    projects = projects.filter((project) =>
      filter.years.includes(Number(project.date.slice(-4)))
    );
  }
  if (filter.topics.length > 0) {
    projects = projects.filter((project) =>
      filter.topics.map((e) => e.value).includes(project.topic)
    );
  }
  if (filter.districts.length > 0) {
    projects = projects.filter((project) =>
      filter.districts.map((e) => e.value).includes(project.quarter)
    );
  }

  return projects;
};
