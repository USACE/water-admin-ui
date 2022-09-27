import { useConnect } from 'redux-bundler-hook';

export default function ChartList() {
  const { chartItems } = useConnect('selectChartItems');
  return chartItems && chartItems.length ? (
    <>
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
