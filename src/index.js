import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import ProjectsProvider from './ProjectsProvider';
import './index.css';
import App from './App';
import { theme } from './theme';
import Fonts from './fonts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <Fonts />
        <QueryClientProvider client={queryClient}>
          <ProjectsProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/:name" element={<App />} />
            </Routes>
          </ProjectsProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
