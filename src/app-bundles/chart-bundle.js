import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chart',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'chart_slug',
  getTemplate: `${apiUrl}/visualizations`,
  // putTemplate: `${apiUrl}/visualizations/:item.id`,
  postTemplate: `${apiUrl}/visualizations`,
  // deleteTemplate: `${apiUrl}/products/:item.id`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});
