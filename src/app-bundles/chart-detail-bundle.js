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
  getTemplate: `${apiUrl}/charts/:chart_slug`,
  // putTemplate: '',
  // postTemplate: '',
  // deleteTemplate: '',
  fetchActions: ['URL_UPDATED'], // @todo; more surgical fetchAction than URL_UPDATED
  urlParamSelectors: ['selectRouteParams'],
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
          obj[m.variable] = m;
        });
        return obj;
      }
    ),
  },
});
