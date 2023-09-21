import React from 'react';

import { Image } from '@chakra-ui/react';

function ProjectImage({ project }) {
  const [imgUrl, setImgUrl] = React.useState(
    'https://via.placeholder.com/250?text=SpasiSofia'
  );
  Promise.resolve(project.imageUrl).then((url) => {
    if (url) {
      setImgUrl(url);
    }
  });

  return (
    <Image
      boxSize={{
        base: '100%',
      }}
      width={{
        base: '100%',
      }}
      objectFit="cover"
      src={imgUrl}
      alt={project.name}
    />
  );
}

export default ProjectImage;
