import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TimeseriesCombobox from '../../app-components/inputs/timeseries-search-input';

function NewChartMappingModal(props) {
  const { variables } = props;

  const {
    doModalClose,
    doChartMappingSave,
    doChartDetailFetch,
    chartByRoute: chart,
  } = useConnect(
    'doModalClose',
    'doChartMappingSave',
    'doChartDetailFetch',
    'selectChartByRoute'
  );

  const [variable, setVariable] = useState(null);
  const [timeseries, setTimeseries] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { provider, datatype, key } = timeseries;
    const payload = {
      variable: variable,
      provider: provider,
      datatype: datatype,
      key: key,
    };
    doChartMappingSave(payload, doChartDetailFetch, true, true);
    doModalClose();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <article>
        <header>Add Variable</header>
        {/* Chart */}
        <label htmlFor='chart'>Chart</label>
        <input id='chart' type='text' value={chart?.name} disabled />
        {/* Variable Field */}
        <label htmlFor='variable'>Variable</label>
        <select
          id='variable'
          onChange={(e) => {
            if (!e.target.value.trim()) {
              setVariable(null);
              return;
            }
            setVariable(e.target.value);
          }}
          required
        >
          <option value='' selected>
            Select variable name...
          </option>
          {variables.map((v, idx) => (
            <option key={idx} value={v.variable}>
              {v.name}
            </option>
          ))}
        </select>
        <TimeseriesCombobox
          title={'Timeseries'}
          value={timeseries}
          onSelect={(k) => {
            setTimeseries(k);
          }}
        />
        <footer>
          {/* FLEXBOX CONTAINER TO HOLD BUTTONS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <button
              onClick={(e) => {
                doModalClose();
              }}
              className='secondary m-0'
            >
              Cancel
            </button>

            <button type='submit' className='m-0'>
              Submit
            </button>
          </div>
        </footer>
      </article>
    </form>
  );
}

export { NewChartMappingModal, NewChartMappingModal as default };
