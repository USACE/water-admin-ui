import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartMapping',
  uid: 'key',
  prefetch: false,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'chart_slug',
  // postTemplate Note; :slug corresponds to visualization.slug, coming from selectChartByRoute
  postTemplate: `${apiUrl}/visualizations/:slug/assign`,
  fetchActions: [],
  urlParamSelectors: ['selectChartByRoute'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});
