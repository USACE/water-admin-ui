import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartMapping',
  uid: 'key',
  prefetch: false,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'chart_slug',
  postTemplate: `${apiUrl}/providers/:provider/charts/:slug/mapping`,
  deleteTemplate: `${apiUrl}/providers/:provider/charts/:slug/mapping`,
  fetchActions: [],
  urlParamSelectors: ['selectChartByRoute'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});
