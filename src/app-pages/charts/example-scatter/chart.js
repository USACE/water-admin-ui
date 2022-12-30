import { createRef, useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';

import ExampleScatter from '../../../_charts/example-scatter/example-scatter';

function ReactExampleScatter() {
  const ref = createRef(); // element where chart will be rendered
  const [info, setInfo] = useState(null); // information chart needs to draw itself

  const {
    chartDetailByRoute: detail,
    chartMappingOptionsByGroup: optionsByGroup,
  } = useConnect(
    'selectChartDetailByRoute',
    'selectChartMappingOptionsByGroup'
  );

  useEffect(() => {
    if (!optionsByGroup || !detail) {
      return;
    }
    // Transform default variable mapping structure used in water-api
    // to specific shape needed by ExampleScatter(input, ref) variable 'input'
    const { required } = optionsByGroup;

    let _info = {};
    detail?.mapping?.forEach((m) => {
      if (required?.[m.variable]) {
        _info[m.variable] = m?.latest_value?.[1];
      }
    });
    setInfo(_info);
  }, [optionsByGroup, detail]);

  useEffect(() => {
    if (info) {
      ExampleScatter(info, ref.current);
    }
  }, [info, ref]);

  return (
    <>
      <div className='svg-container'>
        <svg
          ref={ref}
          preserveAspectRatio='xMinYMin meet'
          viewBox='0 0 1200 600'
        ></svg>
      </div>
    </>
  );
}

export { ReactExampleScatter, ReactExampleScatter as default };
