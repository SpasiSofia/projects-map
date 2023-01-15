import { PROJECTS as STATIC_PROJECTS } from './data/static-projects.js';
import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';

export const SOFIA_GPS_CENTER = [42.698334, 23.319941];
// const HOSTING_URL = 'https://opensheet.elk.sh/';
const BASE_URL = 'https://spasisofia.org';

const prepareProjects = (projects) => {
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

export const fetchProjects = async (filter) => {
  // let smallProjects = [];

  // https://benborgers.com/posts/google-sheets-json
  // 1gw5_HxfGup6dqVk0fWucEKY2wMtee_iMYX689Ubnt8g
  // await fetch(
  //   HOSTING_URL + '1gw5_HxfGup6dqVk0fWucEKY2wMtee_iMYX689Ubnt8g/projectslist'
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     smallProjects = data
  //       .filter((project) => project.timestamp)
  //       .map((el) => {
  //         return {
  //           id: uuidv4(),
  //           name: el.name,
  //           description: el.description,
  //           imageUrl: el.imageUrl,
  //           link: el.link,
  //           tags: el.tags ? el.tags.split(',') : [],
  //           topic: el.topic,
  //           quarter: el.quarter,
  //           coordinates:
  //             el.gpsLat & el.gpsLon
  //               ? [Number(el.gpsLat), Number(el.gpsLon)]
  //               : SOFIA_GPS_CENTER,
  //           date: el.date,
  //         };
  //       });
  //   });
  // smallProjects.shift();

  let projects = [...prepareProjects(STATIC_PROJECTS)]; //, ...smallProjects];

  if (filter.years.length > 0) {
    projects = projects.filter(
      (project) =>
        project.date && filter.years.includes(Number(project.date.slice(-4)))
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
