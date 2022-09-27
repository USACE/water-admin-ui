import { useEffect, useState } from 'react';

const DamProfileChartForm = ({ mapping }) => {
  const [pool, setPool] = useState(mapping.pool);
  const [tail, setTail] = useState(mapping.tail);
  const [inflow, setInflow] = useState(mapping.inflow);
  const [outflow, setOutflow] = useState(mapping.outflow);
  const [damTop, setDamTop] = useState(mapping['top-of-dam']);
  const [streambed, setStreambed] = useState(mapping.streambed);

  useEffect(() => {
    setPool(mapping?.pool);
    setTail(mapping?.tail);
    setInflow(mapping?.inflow);
    setOutflow(mapping?.outflow);
    setDamTop(mapping['top-of-dam']);
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
            <label for='pool'>
              Pool Water Level
              <input
                type='text'
                id='pool'
                name='Pool'
                value={pool}
                onChange={(e) => {
                  setPool(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!pool}
                required
              />
            </label>
            <label for='tail'>
              Tailwater Level
              <input
                type='text'
                id='tail'
                name='Tail'
                value={tail}
                onChange={(e) => {
                  setTail(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!tail}
                required={true}
              />
            </label>
          </div>
          {/* Inflow and Outflow */}
          <div class='grid'>
            <label for='inflow'>
              Inflow
              <input
                type='text'
                id='inflow'
                name='inflow'
                value={inflow}
                onChange={(e) => {
                  setInflow(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!inflow}
                required
              />
            </label>
            <label for='outflow'>
              Outflow
              <input
                type='text'
                id='outflow'
                name='Outflow'
                value={outflow}
                onChange={(e) => {
                  setOutflow(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!outflow}
                required
              />
            </label>
          </div>
          {/* Dam Top and Streambed */}
          <div class='grid'>
            <label for='damTop'>
              Top of Dam
              <input
                type='text'
                id='damTop'
                name='Top of Dam'
                value={damTop}
                onChange={(e) => {
                  setDamTop(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!damTop}
                required
              />
            </label>
            <label for='streambed'>
              Streambed
              <input
                type='text'
                id='streambed'
                name='Streambed'
                value={streambed}
                onChange={(e) => {
                  setStreambed(e.target.value);
                }}
                placeholder='start typing...'
                aria-invalid={!streambed}
                required
              />
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
};

export default DamProfileChartForm;

// {/* <form>
//         <h3>Required Information</h3>
//         <section>
//           <div className='grid'>
//             <label for='pool'>
//               Pool
//               <input
//                 type='text'
//                 id='pool'
//                 name='Pool'
//                 value={pool}
//                 onChange={(e) => {
//                   setPool(e.target.value);
//                 }}
//                 placeholder='start typing...'
//                 aria-invalid={!pool}
//                 required
//               />
//             </label>
//             <label for='tail'>
//               Tailwater
//               <input
//                 type='text'
//                 id='tail'
//                 name='Tailwater'
//                 placeholder='Start Typing...'
//                 value={tail}
//                 onChange={(e) => {
//                   setTail(e.target.value);
//                 }}
//                 aria-invalid={!tail}
//                 required
//               />
//             </label>
//           </div>
//           <div className='grid'>
//             <label for='inflow'>
//               Inflow
//               <input
//                 type='text'
//                 id='inflow'
//                 name='Inflow'
//                 placeholder='Start Typing...'
//                 value={inflow}
//                 required
//               />
//             </label>
//             <label for='outflow'>
//               Outflow
//               <input
//                 type='text'
//                 id='outflow'
//                 name='Outflow'
//                 placeholder='Start Typing...'
//                 value={outflow}
//                 required
//               />
//             </label>
//           </div>
//         </section>
//         <h3>Additional Level Indicators</h3>

//         <button type='submit'>Save Changes</button>
//       </form> */}
