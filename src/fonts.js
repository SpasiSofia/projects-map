import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Sofia Sans';
        src: url('/fonts/SofiaSans-Regular.woff2') format('woff2'),
          url('/fonts/SofiaSans-Regular.otf') format('otf');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Sofia Sans Light';
        src: url('/fonts/SofiaSans-Light.woff2') format('woff2'),
          url('/fonts/SofiaSans-Light.otf') format('otf');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      /* latin */
      @font-face {
        font-family: 'Sofia Sans Bold';
        src: url('/fonts/SofiaSans-Bold.woff2') format('woff2'),
          url('/fonts/SofiaSans-Bold.otf') format('otf');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      `}
  />
);

export default Fonts;
