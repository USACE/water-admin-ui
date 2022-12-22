import { createRef, useEffect } from 'react';

import * from d3;
import DamProfileChart from '../../../_water-widgets/dam-profile-chart/dam-profile-chart';

function ReactDamProfileChart({ mapping }) {
  const ref = createRef();

  useEffect(() => {
    var svg = d3.select(ref);
    svg.append('g').classed('svg-content-responsive', true);
    svg.append('defs');
  }, []);

  return (
    <div className='svg-container'>
      <svg
        ref={ref}
        preserveAspectRatio='xMinYMin meet'
        viewBox='0 0 1240 650'
      ></svg>
    </div>
  );
}

export { ReactDamProfileChart, ReactDamProfileChart as default };
