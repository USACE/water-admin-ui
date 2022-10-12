import { useEffect, useState } from 'react';

import TimeseriesSearchInput from '../app-components/inputs/timeseries-search-input';

const DamProfileChartForm = ({ mapping }) => {
  const [pool, setPool] = useState(mapping.pool);
  const [tail, setTail] = useState(mapping.tail);
  const [inflow, setInflow] = useState(mapping.inflow);
  const [outflow, setOutflow] = useState(mapping.outflow);
  const [damtop, setDamtop] = useState(mapping['top-of-dam']);
  const [streambed, setStreambed] = useState(mapping.streambed);

  useEffect(() => {
    setPool(mapping?.pool);
    setTail(mapping?.tail);
    setInflow(mapping?.inflow);
    setOutflow(mapping?.outflow);
    setDamtop(mapping['top-of-dam']);
    setStreambed(mapping?.streambed);
  }, [mapping]);

  return (
    <>
      <section id='mappings'>
        <h4>Required Mappings</h4>
        {/* Pool and Tailwater */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('SUBMITTED!');
          }}
        >
          <div class='grid'>
            {/* POOL INPUT */}
            <TimeseriesSearchInput
              id='pool'
              title='Pool Water Level'
              value={pool}
              setValue={setPool}
            />
            {/* TAILWATER INPUT */}
            <TimeseriesSearchInput
              id='tail'
              title='Tailwater Level'
              value={tail}
              setValue={setTail}
            />
          </div>
          {/* Inflow and Outflow */}
          <div class='grid'>
            {/* INFLOW INPUT */}
            <TimeseriesSearchInput
              id='inflow'
              title='Inflow'
              value={inflow}
              setValue={setInflow}
            />
            {/* OUTFLOW INPUT */}
            <TimeseriesSearchInput
              id='outflow'
              title='Outflow'
              value={outflow}
              setValue={setOutflow}
            />
          </div>
          {/* Dam Top and Streambed */}
          <div class='grid'>
            {/* DAM TOP INPUT */}
            <TimeseriesSearchInput
              id='damtop'
              title='Top of Dam'
              value={damtop}
              setValue={setDamtop}
            />
            {/* STREAMBED INPUT */}
            <TimeseriesSearchInput
              id='streambed'
              title='Streambed'
              value={streambed}
              setValue={setStreambed}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
};

export default DamProfileChartForm;
