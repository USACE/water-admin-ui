import { useEffect, useState } from 'react';

import TimeseriesSearchInput from '../app-components/inputs/timeseries-search-input';

const DamProfileChartForm = ({ mapping }) => {
  // Values
  const [pool, setPool] = useState(mapping.pool);
  const [tail, setTail] = useState(mapping.tail);
  const [inflow, setInflow] = useState(mapping.inflow);
  const [outflow, setOutflow] = useState(mapping.outflow);
  const [damtop, setDamtop] = useState(mapping['top-of-dam']);
  const [streambed, setStreambed] = useState(mapping.streambed);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  const [poolIsValid, setPoolIsValid] = useState(null);
  const [tailIsValid, setTailIsValid] = useState(null);
  const [inflowIsValid, setInflowIsValid] = useState(null);
  const [outflowIsValid, setOutflowIsValid] = useState(null);
  const [damtopIsValid, setDamtopIsValid] = useState(null);
  const [streambedIsValid, setStreambedIsValid] = useState(null);

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
            if (
              poolIsValid &&
              tailIsValid &&
              inflowIsValid &&
              outflowIsValid &&
              damtopIsValid &&
              streambedIsValid
            ) {
              const payload = [
                {
                  variable: 'pool',
                  key: pool.key,
                  datasource_type: pool.datasource_type,
                },
              ];
              console.log(JSON.stringify(payload));
              console.log('SUBMITTED!');
            }
          }}
        >
          <div class='grid'>
            {/* POOL INPUT */}
            <TimeseriesSearchInput
              id='pool'
              title='Pool Water Level'
              value={pool}
              setValue={setPool}
              isValid={poolIsValid}
              setIsValid={setPoolIsValid}
            />
            {/* TAILWATER INPUT */}
            <TimeseriesSearchInput
              id='tail'
              title='Tailwater Level'
              value={tail}
              setValue={setTail}
              isValid={tailIsValid}
              setIsValid={setTailIsValid}
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
              isValid={inflowIsValid}
              setIsValid={setInflowIsValid}
            />
            {/* OUTFLOW INPUT */}
            <TimeseriesSearchInput
              id='outflow'
              title='Outflow'
              value={outflow}
              setValue={setOutflow}
              isValid={outflowIsValid}
              setIsValid={setOutflowIsValid}
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
              isValid={damtopIsValid}
              setIsValid={setDamtopIsValid}
            />
            {/* STREAMBED INPUT */}
            <TimeseriesSearchInput
              id='streambed'
              title='Streambed'
              value={streambed}
              setValue={setStreambed}
              isValid={streambedIsValid}
              setIsValid={setStreambedIsValid}
            />
          </div>
          <button type='submit'>Submit</button>
          <pre>{JSON.stringify([pool, tail, inflow, outflow])}</pre>
        </form>
      </section>
    </>
  );
};

export default DamProfileChartForm;
