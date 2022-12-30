import { useEffect, useRef, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';

import TimeseriesCombobox from '../../../app-components/inputs/timeseries-search-input';
import NewChartMappingButton from '../new-chart-mapping-button';

import ReactDamProfileChart from './chart';

function DamProfileChartDetails() {
  // Connect
  const {
    chartMappingOptionsByGroup,
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

  // Values
  const [pool, setPool] = useState(mapping.pool);
  const [tail, setTail] = useState(mapping.tail);
  const [inflow, setInflow] = useState(mapping.inflow);
  const [outflow, setOutflow] = useState(mapping.outflow);
  const [damtop, setDamtop] = useState(mapping.damtop);
  const [dambottom, setDambottom] = useState(mapping.dambottom);

  useEffect(() => {
    setPool(mapping?.pool);
    setTail(mapping?.tail);
    setInflow(mapping?.inflow);
    setOutflow(mapping?.outflow);
    setDamtop(mapping?.damtop);
    setDambottom(mapping?.dambottom);
  }, [mapping]);

  const chartRef = useRef(null);

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

  // Mapped levels, ordered alphabetically a --> z
  const mappedArr = Object.values(mapping)
    ?.filter((m) => m.variable.slice(0, 6) === 'level-')
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  // Determine lst of all level variables available for mapping,
  // EXCLUDING any level variables that have already been mapped. This
  // will prevent us from showing options in the dropdown that have already
  // been configured
  const options = Object.values(chartMappingOptionsByGroup?.levels).filter(
    (item) => !mapping[item.variable]
  );

  return (
    <>
      <section id='chart' ref={chartRef}>
        <ReactDamProfileChart />
      </section>
      <section id='mappings'>
        <h4>Required Mappings</h4>
        {/* Pool and Tailwater */}
        <form autoComplete='off'>
          <div id='mappings'>
            {/* POOL INPUT */}
            <TimeseriesCombobox
              title='Pool Water Level'
              value={pool}
              onSelect={handler('pool')}
            />
            {/* TAILWATER INPUT */}
            <TimeseriesCombobox
              title='Tailwater Level'
              value={tail}
              onSelect={handler('tail')}
            />
            {/* INFLOW INPUT */}
            <TimeseriesCombobox
              title='Inflow'
              value={inflow}
              onSelect={handler('inflow')}
            />
            {/* OUTFLOW INPUT */}
            <TimeseriesCombobox
              title='Outflow'
              value={outflow}
              onSelect={handler('outflow')}
            />
            {/* DAM TOP INPUT */}
            <TimeseriesCombobox
              title='Top of Dam'
              value={damtop}
              onSelect={handler('damtop')}
            />
            {/* DAM BOTTOM INPUT */}
            <TimeseriesCombobox
              title='Bottom of Dam (Streambed)'
              value={dambottom}
              onSelect={handler('dambottom')}
            />
          </div>
        </form>
      </section>
      <section>
        <h4>
          Levels
          <NewChartMappingButton variables={options} />
        </h4>
        <form autoComplete='off'>
          {mappedArr.map((l, idx) => (
            <TimeseriesCombobox
              key={idx}
              title={chartMappingOptionsByGroup?.levels[l.variable].name}
              value={l}
              onSelect={handler(l.variable)}
            />
          ))}
        </form>
      </section>
    </>
  );
}

export default DamProfileChartDetails;
