import { useConnect } from 'redux-bundler-hook';

export default function DeleteChartModal() {
  const {
    doChartDelete,
    doModalClose,
    doUpdateUrl,
    chartByRoute: chart,
  } = useConnect(
    'doChartDelete',
    'doModalClose',
    'doUpdateUrl',
    'selectChartByRoute'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    doChartDelete(
      chart,
      () => {
        doUpdateUrl(`/${chart.provider}/charts`);
      },
      true
    );
    doModalClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <header>Delete Chart</header>
        <div className='container-fluid justify-around'>
          <div className='mb-3'>
            Are you sure you want to <i>permanently</i> delete this chart?
          </div>

          <h3>{chart.name}</h3>
        </div>

        <footer>
          {/* FLEXBOX CONTAINER TO HOLD BUTTONS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <button
              onClick={(e) => {
                doModalClose();
              }}
              className='secondary outline m-0'
            >
              Cancel
            </button>

            <button type='submit' className='m-0'>
              Delete
            </button>
          </div>
        </footer>
      </article>
    </form>
  );
}
