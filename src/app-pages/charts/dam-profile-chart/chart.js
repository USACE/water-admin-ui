import { createRef, useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';

import DamProfileChart from '../../../_charts/dam-profile-chart/dam-profile-chart';

function ReactDamProfileChart() {
  const ref = createRef(); // element where DamProfileChart will be rendered
  const [info, setInfo] = useState(null); // information DamProfileChart needs to draw itself

  const {
    chartDetailByRoute: detail,
    chartMappingOptionsByGroup: optionsByGroup,
  } = useConnect(
    'selectChartDetailByRoute',
    'selectChartMappingOptionsByGroup'
  );

  useEffect(() => {
    if (!optionsByGroup || !detail) {
      return null;
    }
    // Transform default variable mapping structure used in water-api
    // to specific shape needed by DamProfileChart(input, ref) variable 'input'
    const { required, levels } = optionsByGroup;

    let _info = {
      levels: [],
    };
    detail?.mapping?.forEach((m) => {
      // if variable is included in the 'levels' object
      // the variable and its current value will be used to construct
      // a red marker line and label on the graphic.
      if (levels?.[m.variable]) {
        _info.levels.push({
          name: levels?.[m.variable]?.name,
          value: m?.latest_value?.[1],
        });
      }
      // add required variables for dam profile chart to info
      if (required?.[m.variable]) {
        _info[m.variable] = m?.latest_value?.[1];
        // Special Case: Required variables damtop, dambottom
        // also get red marker line and label on the graphic
        if (m.variable === 'damtop' || m.variable === 'dambottom') {
          _info.levels.push({
            name: required?.[m.variable].name,
            value: m?.latest_value?.[1],
          });
        }
      }
    });

    setInfo(_info);
  }, [optionsByGroup, detail]);

  useEffect(() => {
    if (info) {
      DamProfileChart(info, ref.current);
    }
  }, [info, ref]);

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
