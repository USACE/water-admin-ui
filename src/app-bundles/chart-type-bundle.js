import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartType',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0,
  persist: false,
  routeParam: null,
  getTemplate: `${apiUrl}/chart_types`,
  // putTemplate: `${apiUrl}/products/:item.id`,
  // postTemplate: `${apiUrl}/products`,
  // deleteTemplate: `${apiUrl}/products/:item.id`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});
