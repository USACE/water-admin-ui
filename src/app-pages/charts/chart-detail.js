import { useConnect } from 'redux-bundler-hook';
import DeleteChartModal from '../../app-modals/delete-chart-modal.js';

// Specialized detail sections, specific to each chart type
import DamProfileChartDetail from './dam-profile-chart/chart-detail.js';
import ExampleScatterDetail from './example-scatter/chart-detail.js';

function SpecializedChartDetail(type, props) {
  const formComponents = {
    'dam-profile-chart': <DamProfileChartDetail />,
    'example-scatter': <ExampleScatterDetail />,
  };
  return formComponents[type];
}

export default function ChartDetail() {
  const { doModalOpen, chartDetailByRoute: chart } = useConnect(
    'doModalOpen',
    'selectChartDetailByRoute'
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
      {/* Return correct SpecializedChartDetail based on chart's type */}
      {SpecializedChartDetail(chart.type)}
    </>
  );
}
