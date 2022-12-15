import { useConnect } from 'redux-bundler-hook';

function ProviderList() {
  const { providerItems: providers } = useConnect('selectProviderItems');
  return providers && providers.length ? (
    <ul>
      {providers.map((p) => (
        <li>
          <a href={`/${p.provider}`}>{`${p.provider}: ${p.provider_name}`} </a>
        </li>
      ))}
    </ul>
  ) : null;
}

export default function Home() {
  return (
    <>
      <section>
        <h3>Data Providers</h3>
        <ProviderList />
      </section>
    </>
  );
}
