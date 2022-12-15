import { useConnect } from 'redux-bundler-hook';
import NewChartModal from '../app-modals/new-chart-modal.js';

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
  const { providerByRoute: provider, chartItems } = useConnect(
    'selectProviderByRoute',
    'selectChartItems'
  );
  return (
    <>
      <ChartListHeader />
      {chartItems?.length
        ? chartItems.map((v) => (
            <section>
              <a href={`/${provider?.provider}/charts/${v.slug}`}>
                <div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      float: 'right',
                      padding: '1rem',
                      background:
                        'linear-gradient(45deg, white, hsl(195deg 85% 41%))',
                      color: 'black',
                      borderTopRightRadius: '0.25rem',
                      borderBottomLeftRadius: '2rem',
                    }}
                  >
                    {v.provider_slug}
                  </div>
                  <article>
                    <hgroup>
                      <h2>{v.name}</h2>
                      <h3>Provided by {v.provider_name}</h3>
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
