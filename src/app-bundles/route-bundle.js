import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.js';
import fourOhFour from '../app-pages/404.js';
import ChartList from '../app-pages/chart-list.js';
import ChartDetail from '../app-pages/chart-detail.js';

export default createRouteBundle({
  '/': Home,
  '/charts': ChartList,
  '/charts/:chart_slug': ChartDetail,
  '*': fourOhFour,
});
