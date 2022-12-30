import { useRef } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TimeseriesCombobox from '../../../app-components/inputs/timeseries-search-input';

import { ReactExampleScatter } from './chart';

function ExampleScatterDetails() {
  const chartRef = useRef(null);

  // Connect
  const {
    chartMappingOptionsByGroup: optionsByGroup,
    chartDetailMappingObject: mapping,
    doChartMappingSave,
    doChartMappingDelete,
    doChartDetailFetch,
  } = useConnect(
    'selectChartMappingOptionsByGroup',
    'selectChartDetailMappingObject',
    'doChartMappingSave',
    'doChartMappingDelete',
    'doChartDetailFetch'
  );

  // handler requires variable string like 'pool' and returns a function
  // that accepts an object with keys/values to uniquely identify a timeseries;
  // Specifically {provider, datatype, key}.
  const handler = (variable) => (selectedItem) => {
    // if no variable, this function is being constructed incorrectly
    // in software development. Should always be called like: handler('pool', {...})
    if (!variable) {
      console.error('Variable not specified; Handler implemented incorrectly');
      return;
    }
    // If called with timeseries information set to null, delete existing mappings for variable in database.
    // This results in behavior "if you clear the form input, delete is called on the database"
    if (!selectedItem) {
      console.log(`Delete Mapping for Variable: ${variable}`);
      doChartMappingDelete({ variable: variable }, doChartDetailFetch, true);
      return;
    }
    // Otherwise, save the mapping
    const { provider, datatype, key } = selectedItem;
    doChartMappingSave(
      {
        variable: variable,
        provider: provider,
        datatype: datatype,
        key: key,
      },
      doChartDetailFetch,
      true,
      true
    );
  };

  return (
    <>
      <section id='chart' ref={chartRef}>
        <ReactExampleScatter />
      </section>
      <section id='mappings'>
        <h4>Required Mappings</h4>
        {/* Pool and Tailwater */}
        <form autoComplete='off'>
          <div id='mappings'>
            {!optionsByGroup || !mapping
              ? null
              : Object.values(optionsByGroup?.required).map((m, idx) => (
                  <TimeseriesCombobox
                    key={idx}
                    title={m.name}
                    value={mapping?.[m.variable]}
                    onSelect={handler(m?.variable)}
                  />
                ))}
          </div>
        </form>
      </section>
    </>
  );
}

export default ExampleScatterDetails;
