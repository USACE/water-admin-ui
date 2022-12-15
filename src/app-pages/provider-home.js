import { useConnect } from 'redux-bundler-hook';

export default function ProviderHome() {
  const { providerByRoute: provider } = useConnect('selectProviderByRoute');
  return (
    <>
      <section>
        <h3>{provider?.provider_name}</h3>
        <ul>
          <li>
            <a href={`/${provider?.provider}/charts`}>Chart Configurations</a>
          </li>
        </ul>
      </section>
    </>
  );
}
