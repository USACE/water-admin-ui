import { useConnect } from 'redux-bundler-hook';
import DamProfileChartForm from '../forms/dam-profile-chart.js';

function ChartConfigurationForm(type, props) {
  // @TODO: Change to a form slug rather than UUID
  const formComponents = {
    '53da77d0-6550-4f02-abf8-4bcd1a596a7c': <DamProfileChartForm {...props} />,
  };
  return formComponents[type];
}

export default function ChartDetail() {
  const { chartDetailByRoute: info, chartDetailMappingObj: mappingObj } =
    useConnect('selectChartDetailByRoute', 'selectChartDetailMappingObj');

  return !info ? null : (
    <>
      <section>
        <hgroup>
          <h3>{info.name}</h3>
          <p>
            <small>TODO; Provided by USACE, Huntington District</small>
          </p>
        </hgroup>
      </section>
      <section id='chart'>
        <article>
          <h4 style={{ textAlign: 'center' }}>CHART HERE</h4>
        </article>
      </section>
      {/* Return correct ChartConfigurationForm based on chart type_id */}
      {ChartConfigurationForm(info.type_id, { mapping: mappingObj })}
    </>
  );
}
