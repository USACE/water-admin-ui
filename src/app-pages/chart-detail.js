import { useConnect } from 'redux-bundler-hook';
import DamProfileChartForm from '../forms/dam-profile-chart.js';
import DeleteChartModal from '../app-modals/delete-chart-modal.js';

function ChartConfigurationForm(type, props) {
  // @TODO: Change to a form slug rather than UUID
  const formComponents = {
    '53da77d0-6550-4f02-abf8-4bcd1a596a7c': <DamProfileChartForm {...props} />,
  };
  return formComponents[type];
}

export default function ChartDetail() {
  const {
    doModalOpen,
    chartDetailByRoute: info,
    chartDetailMappingObj: mappingObj,
  } = useConnect(
    'doModalOpen',
    'selectChartDetailByRoute',
    'selectChartDetailMappingObj'
  );

  return !info ? null : (
    <>
      <section>
        <div className='container mb-4'>
          <div className='row align-items-start'>
            <div className='col'>
              <h3 className='mb-0'>{info.name}</h3>
              <p className='mb-0'>
                <small>
                  Provided by {info.provider_name} ({info.provider})
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
      {/* Return correct ChartConfigurationForm based on chart type_id */}
      {ChartConfigurationForm(info.type_id, { mapping: mappingObj })}
    </>
  );
}
