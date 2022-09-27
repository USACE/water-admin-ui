import { useConnect } from 'redux-bundler-hook';

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

const NewChartModal = () => {
  const { doModalClose } = useConnect('doModalClose');
  return (
    <article>
      <header>New Chart</header>
      <p>
        Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
        facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend a
        dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
        ullamcorper.
      </p>
      <footer>
        <a
          role='button'
          href='/charts'
          class='secondary'
          onClick={(e) => {
            e.preventDefault();
            doModalClose();
          }}
        >
          Cancel
        </a>
        {/* todo; dynamically set href to slug of new chart to be created */}
        <a
          href='#chart-save'
          role='button'
          onClick={(e) => {
            e.preventDefault();
            console.log('TODO; CONFIRM NEW CHART SAVE');
            doModalClose();
          }}
        >
          Confirm
        </a>
      </footer>
    </article>
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
          <div id='filters' style={{ display: 'flex', gap: 12 }}>
            <small>
              <a href='#todo'>x</a> provider:lrh
            </small>
            <small>
              <a href='#todo'>x</a> type:dam-profile-chart
            </small>
          </div>
        </hgroup>
      </section>
    </>
  );
};

export default function ChartList() {
  const { chartItems } = useConnect('selectChartItems');
  return chartItems && chartItems.length ? (
    <>
      <ChartListHeader />
      {chartItems.map((v) => (
        <section>
          <a href={`/charts/${v.slug}`}>
            <div>
              <article>
                <hgroup>
                  <h2>{v.name}</h2>
                  <h3>Provided by Huntington District, USACE</h3>
                </hgroup>
              </article>
            </div>
          </a>
        </section>
      ))}
    </>
  ) : null;
}
