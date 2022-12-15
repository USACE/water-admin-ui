import createRestBundle from '@usace/create-rest-bundle';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chart',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'chart_slug',
  getTemplate: `${apiUrl}/providers/:provider/charts`,
  // putTemplate: `${apiUrl}/charts/:item.id`,
  postTemplate: `${apiUrl}/providers/:provider/charts`,
  deleteTemplate: `${apiUrl}/providers/:item.provider/charts/:item.slug`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: ['selectProviderByRoute'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {},
});
