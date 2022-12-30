import { createRef, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';

import DamProfileChart from '../../../_charts/dam-profile-chart/dam-profile-chart';

function transformer(detail) {
  const levels = {
    'level-bottom-of-flood': 'Bottom of Flood',
    'level-bottom-of-normal': 'Bottom of Normal',
    'level-top-of-conservation': 'Top of Conservation',
    'level-top-of-flood': 'Top of Flood',
    'level-top-of-normal': 'Top of Normal',
  };

  let info = {
    levels: [],
  };
  detail?.mapping?.forEach((m) => {
    // levels; todo
    // Note: level name map is a placeholder, temporary solution
    // chart_variable records in the database
    // could benefit from an optional "group" field to support
    // arrays of variables having the same functionality,
    // such as levels
    if (levels[m.variable]) {
      info.levels.push({
        name: levels[m.variable],
        value: m?.latest_value?.[1],
      });
    }
    switch (m.variable) {
      case 'pool':
      case 'tail':
      case 'inflow':
      case 'outflow':
        info[m.variable] = m?.latest_value?.[1];
        break;
      case 'damtop':
        info[m.variable] = m?.latest_value?.[1];
        info.levels.push({
          name: 'Top of Dam',
          value: m?.latest_value?.[1],
        });
        break;
      case 'dambottom':
        info[m.variable] = m?.latest_value?.[1];
        info.levels.push({
          name: 'Bottom of Dam',
          value: m?.latest_value?.[1],
        });
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
