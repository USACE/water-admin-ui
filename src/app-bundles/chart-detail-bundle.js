import createRestBundle from '@usace/create-rest-bundle';
import { createSelector } from 'redux-bundler';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartDetail',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: 'chart_slug',
  getTemplate: `${apiUrl}/visualizations/:chart_slug`,
  // putTemplate: `${apiUrl}/products/:item.id`,
  // postTemplate: `${apiUrl}/products`,
  // deleteTemplate: `${apiUrl}/products/:item.id`,
  fetchActions: ['URL_UPDATED'], // @todo; more surgical fetchAction than URL_UPDATED
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {
    selectChartDetailMappingObj: createSelector(
      'selectChartDetailByRoute',
      (detail) => {
        if (!detail) {
          return {};
        }
        const obj = {};
        detail.mapping.forEach((m) => {
          obj[m.variable] = m.key;
        });
        return obj;
      }
    ),
  },
});
