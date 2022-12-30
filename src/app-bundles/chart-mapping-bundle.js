import createRestBundle from '@usace/create-rest-bundle';
import { createSelector } from 'redux-bundler';
import { CHART_MAPPING_OPTIONS } from './chart-mapping-config'; // todo; integrate this data into api so it's not managed in the UI

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartMapping',
  uid: '',
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
  addons: {
    selectChartMappingOptionsByGroup: createSelector(
      'selectChartDetailByRoute',
      (chart) => {
        return CHART_MAPPING_OPTIONS[chart?.type];
      }
    ),
  },
});
