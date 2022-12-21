import { useConnect } from 'redux-bundler-hook';
import NewChartModal from '../../app-modals/new-chart-modal.js';

const NewChartButton = () => {
  const { doModalOpen } = useConnect('doModalOpen');
  return (
    <a
      style={{
        marginLeft: 8,
        fontWeight: '800',
        fontSize: 18,
      }}
      class='primary'
      href='#newchart'
      onClick={(e) => {
        e.preventDefault();
        doModalOpen(NewChartModal, {});
      }}
    >
      +add
    </a>
  );
};

const ChartListHeader = () => {
  return (
    <>
      <section>
        <hgroup>
          <h3>
            Charts
            <NewChartButton />
          </h3>
          {/* todo; filters currently shown to demonstrate concept. should drive filters from querystring, background ajax fetch as necessary */}
          <div id='filters' style={{ display: 'flex', gap: 12 }}></div>
        </hgroup>
      </section>
    </>
  );
};

export default function ChartList() {
  const {
    providerByRoute: provider,
    chartItems,
    chartTypeItemsObject: chartTypeObj,
  } = useConnect(
    'selectProviderByRoute',
    'selectChartItems',
    'selectChartTypeItemsObject'
  );
  return (
    <>
      <ChartListHeader />
      {chartItems?.length
        ? chartItems.map((v) => (
            <section>
              <a href={`/${provider?.provider}/charts/${v.slug}`}>
                <div>
                  <article>
                    <hgroup>
                      <h2>{v.name}</h2>
                      <h4 className=''>
                        A {chartTypeObj[v.type]?.name} for Location:{' '}
                        {`(${v?.location?.provider?.toUpperCase()}) ${
                          v?.location?.code
                        }`}
                      </h4>
                    </hgroup>
                  </article>
                </div>
              </a>
            </section>
          ))
        : null}
    </>
  );
}
