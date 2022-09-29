import createRestBundle from '@usace/create-rest-bundle';

// const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: 'chartType',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0,
  persist: false,
  routeParam: null,
  // getTemplate: `${apiUrl}/visualizations`,
  // putTemplate: `${apiUrl}/products/:item.id`,
  // postTemplate: `${apiUrl}/products`,
  // deleteTemplate: `${apiUrl}/products/:item.id`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  reduceFurther: null,
  addons: {
    // TODO: This overrides the default createRestBundle selector
    //       that has the same name. Chart types supported by the
    //       water-api (depending upon which version of d3-chart-server is used)
    //       should be exposed as an endpoint in water-api so this information can
    //       be fetched
    selectChartTypeItems: (state) => [
      {
        id: '53da77d0-6550-4f02-abf8-4bcd1a596a7c',
        slug: 'dam-profile-chart',
        name: 'Dam Profile Chart',
      },
      {
        id: '61910b8c-4dfb-4343-affb-d478b6bf915f',
        slug: 'example-scatter',
        name: 'Example Scatter Plot',
      },
    ],
  },
});
