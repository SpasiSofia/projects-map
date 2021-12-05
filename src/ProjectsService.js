import { PROJECTS } from './data/static-projects.js';
import { v4 as uuidv4 } from 'uuid';

export const fetchProjects = async (filter) => {
  let smallProjects = []
  // TODO Apply projects filtering
  await fetch('https://opensheet.vercel.app/1-4jrHfL_nJex6gt2VMIaj2TP-f-xAhFo12iVlCSK2sQ/projectslist')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    smallProjects = data.filter(project => project.timestamp).map(el=> {
      return {
        id: uuidv4(),
        name: el.name,
        description: el.description,
        imageUrl: el.imageUrl,
        link: el.link,
        categories: [el.tags],
        topcis: el.topic,
        coordinates: [Number(el.gpsLat), Number(el.gpsLon)],
        date: el.date
      }
    });

  });
  return [...PROJECTS, ...smallProjects];
};