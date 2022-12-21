import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.js';
import fourOhFour from '../app-pages/404.js';
import ChartList from '../app-pages/charts/chart-list.js';
import ChartDetail from '../app-pages/charts/chart-detail.js';
import ProviderHome from '../app-pages/provider-home.js';

export default createRouteBundle({
  '/': Home,
  '/:provider': ProviderHome,
  '/:provider/charts': ChartList,
  '/:provider/charts/:chart_slug': ChartDetail,
  '*': fourOhFour,
});
