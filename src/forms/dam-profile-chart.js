import { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';

import TimeseriesCombobox from '../app-components/inputs/timeseries-search-input';

const DamProfileChartForm = ({ mapping }) => {
  // Connect
  const { doChartMappingSave } = useConnect('doChartMappingSave');

  // Values
  const [pool, setPool] = useState(mapping.pool);
  const [tail, setTail] = useState(mapping.tail);
  const [inflow, setInflow] = useState(mapping.inflow);
  const [outflow, setOutflow] = useState(mapping.outflow);
  const [damtop, setDamtop] = useState(mapping.damtop);
  const [streambed, setStreambed] = useState(mapping.streambed);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  // TODO; More strict validation checking. Currently, if a string value is set, it is considered valid.
  //       In the future, may want to consider checking if string value represents a valid timeseries
  const [poolIsValid, setPoolIsValid] = useState(pool ? true : false);
  const [tailIsValid, setTailIsValid] = useState(tail ? true : false);
  const [inflowIsValid, setInflowIsValid] = useState(inflow ? true : false);
  const [outflowIsValid, setOutflowIsValid] = useState(outflow ? true : false);
  const [damtopIsValid, setDamtopIsValid] = useState(damtop ? true : false);
  const [streambedIsValid, setStreambedIsValid] = useState(
    streambed ? true : false
  );

  useEffect(() => {
    setPool(mapping?.pool);
    setTail(mapping?.tail);
    setInflow(mapping?.inflow);
    setOutflow(mapping?.outflow);
    setDamtop(mapping?.damtop);
    setStreambed(mapping?.streambed);
  }, [mapping]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT');
    let payload = [];
    if (poolIsValid) {
      payload.push({
        variable: 'pool',
        key: pool.key,
        datasource_type: pool.datasource_type,
        provider: pool.provider,
      });
    }
    if (tailIsValid) {
      payload.push({
        variable: 'tail',
        key: tail.key,
        datasource_type: tail.datasource_type,
        provider: tail.provider,
      });
    }
    if (inflowIsValid) {
      payload.push({
        variable: 'inflow',
        key: inflow.key,
        datasource_type: inflow.datasource_type,
        provider: inflow.provider,
      });
    }
    if (outflowIsValid) {
      payload.push({
        variable: 'outflow',
        key: outflow.key,
        datasource_type: outflow.datasource_type,
        provider: outflow.provider,
      });
    }
    if (damtopIsValid) {
      payload.push({
        variable: 'damtop',
        key: damtop.key,
        datasource_type: damtop.datasource_type,
        provider: damtop.provider,
      });
    }
    if (streambedIsValid) {
      payload.push({
        variable: 'streambed',
        key: streambed.key,
        datasource_type: streambed.datasource_type,
        provider: streambed.provider,
      });
    }
    // SUBMIT PAYLOAD
    doChartMappingSave(payload);
  }

  return (
    <>
      <section id='mappings'>
        <h4>Required Mappings</h4>
        {/* Pool and Tailwater */}
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div id='mappings'>
            {/* POOL INPUT */}
            <TimeseriesCombobox
              title='Pool Water Level'
              value={pool}
              setValue={setPool}
              isValid={poolIsValid}
              setIsValid={setPoolIsValid}
            />
            {/* TAILWATER INPUT */}
            <TimeseriesCombobox
              title='Tailwater Level'
              value={tail}
              setValue={setTail}
              isValid={tailIsValid}
              setIsValid={setTailIsValid}
            />
            {/* INFLOW INPUT */}
            <TimeseriesCombobox
              title='Inflow'
              value={inflow}
              setValue={setInflow}
              isValid={inflowIsValid}
              setIsValid={setInflowIsValid}
            />
            {/* OUTFLOW INPUT */}
            <TimeseriesCombobox
              title='Outflow'
              value={outflow}
              setValue={setOutflow}
              isValid={outflowIsValid}
              setIsValid={setOutflowIsValid}
            />
            {/* DAM TOP INPUT */}
            <TimeseriesCombobox
              title='Top of Dam'
              value={damtop}
              setValue={setDamtop}
              isValid={damtopIsValid}
              setIsValid={setDamtopIsValid}
            />
            {/* STREAMBED INPUT */}
            <TimeseriesCombobox
              title='Streambed'
              value={streambed}
              setValue={setStreambed}
              isValid={streambedIsValid}
              setIsValid={setStreambedIsValid}
            />
          </div>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default DamProfileChartForm;
