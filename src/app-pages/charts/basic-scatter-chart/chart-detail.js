const BasicScatterChartDetails = ({ mapping }) => {
  // useEffect(() => {
  //   setPool(mapping?.pool);
  //   setTail(mapping?.tail);
  //   setInflow(mapping?.inflow);
  //   setOutflow(mapping?.outflow);
  //   setDamtop(mapping?.damtop);
  //   setStreambed(mapping?.streambed);
  // }, [mapping]);

  function handleSubmit(e) {
    console.log('SUBMIT (EXAMPLE)');
  }

  return (
    <>
      <section id='mappings'>
        <h4>Required Mappings</h4>
        {/* Pool and Tailwater */}
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div id='mappings'>
            <article>
              MAPPING INFORMATION HERE FOR BASIC SCATTER CHART (EXAMPLE)
            </article>
          </div>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default BasicScatterChartDetails;
