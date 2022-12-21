import { useConnect } from 'redux-bundler-hook';
import DeleteChartModal from '../../app-modals/delete-chart-modal.js';

// Specialized detail sections, specific to each chart type
import DamProfileChartDetail from './chart-detail-dam-profile.js';
import BasicScatterChartDetail from './chart-detail-basic-scatter.js';

function SpecializedChartDetail(type, props) {
  const formComponents = {
    'dam-profile-chart': <DamProfileChartDetail {...props} />,
    'example-scatter': <BasicScatterChartDetail {...props} />,
  };
  return formComponents[type];
}

export default function ChartDetail() {
  const {
    doModalOpen,
    chartDetailByRoute: chart,
    chartDetailMappingObj: mappingObj,
  } = useConnect(
    'doModalOpen',
    'selectChartDetailByRoute',
    'selectChartDetailMappingObj'
  );

  return !chart ? null : (
    <>
      <section>
        <div className='container mb-4'>
          <div className='row align-items-start'>
            <div className='col'>
              <h3 className='mb-0'>{chart.name}</h3>
              <p className='mb-0'>
                <small>
                  Provided by {chart.provider_name} (
                  {chart?.provider?.toUpperCase()})
                </small>
              </p>
            </div>
            <button
              onClick={() => {
                doModalOpen(DeleteChartModal);
              }}
              className='col-auto align-middle mb-0 p-2 secondary'
            >
              x Delete
            </button>
          </div>
        </div>
      </section>
      <section id='chart'>
        <article>
          <h4 style={{ textAlign: 'center' }}>CHART HERE</h4>
        </article>
      </section>
      {/* Return correct SpecializedChartDetail based on chart's type */}
      {SpecializedChartDetail(chart.type, { mapping: mappingObj })}
    </>
  );
}
