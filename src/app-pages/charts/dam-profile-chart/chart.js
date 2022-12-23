import { createRef, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';

import DamProfileChart from '../../../_charts/dam-profile-chart/dam-profile-chart';

function transformer(detail) {
  const varNames = {
    'top-of-flood': 'Top of Flood',
    'bottom-of-flood': 'Bottom of Flood',
  };

  let info = {
    levels: [],
  };
  detail?.mapping?.forEach((m) => {
    switch (m.variable) {
      case 'pool':
      case 'tail':
      case 'inflow':
      case 'outflow':
      case 'damtop':
      case 'dambottom':
        info[m.variable] = m?.latest_value?.[1];
        return;
      // levels
      // note: level names put in as placeholders
      // actual level names need to be determined
      // todo; chart variable records in the database
      // may need an optional "role" field to support
      // arrays of variables having the same functionality,
      // such as levels
      case 'top-of-flood':
      case 'bottom-of-flood':
        info.levels.push({ name: varNames[m], value: m?.latest_value?.[1] });
        break;
      default:
        break;
    }
  });

  return info;
}

function ReactDamProfileChart() {
  const ref = createRef();
  const { chartDetailByRoute: detail } = useConnect('selectChartDetailByRoute');
  useEffect(() => {
    DamProfileChart(transformer(detail), ref.current);
  }, [detail, ref]);

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
