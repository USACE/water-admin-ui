// todo; Update import to @usace-bundles/create-searchable-bundle
//       after create-searchable-bundle incorporated into
//       https://github.com/USACE/usace-bundles
import createSearchableBundle from './create-searchable-bundle';

export default createSearchableBundle({
  searchEntity: 'timeseries',
  actionPrefix: 'TIMESERIES',
  doSearch:
    () =>
    ({ dispatch, store, apiGet }) => {
      dispatch({ type: 'TIMESERIES_SEARCH_START' });
      // Do not fire request if fewer than 2 characters in search
      const q = store.selectSearchQuery();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 3) {
        dispatch({ type: 'TIMESERIES_SEARCH_FINISH', payload: [] });
        return;
      }
      apiGet(
        `${
          process.env.REACT_APP_WATER_API_URL
        }/timeseries?q=${encodeURIComponent(q)}`,
        (err, json) => {
          if (err) {
            dispatch({
              type: 'TIMESERIES_SEARCH_ERROR',
              payload: err,
            });
          } else {
            dispatch({
              type: 'TIMESERIES_SEARCH_FINISH',
              payload: json,
            });
          }
        }
      );
    },
});
