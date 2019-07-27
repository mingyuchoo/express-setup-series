// import home from './handlers/home';
// const routes = (app) => {
//   // main routes
//   app.get('/', home.index);
//   app.get('/about', home.about);
//   app.get('/contact', home.contact);
// };


import { index, about, contact } from  './handlers/home';

const routes = (app) => {
  // main routes
  app.get('/', index);
  app.get('/about', about);
  app.get('/contact', contact);
};

export default routes
