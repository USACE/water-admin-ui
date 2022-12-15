// POST Payload
// {
//     "location_slug": "lrh-test-project",
//     "name": "LRHTestProject Dam Profile Chart",
//     "type_id": "53da77d0-6550-4f02-abf8-4bcd1a596a7c"
// }
// TODO; Change type_id to 'type' (slug of chart) in api
// TODO; May need to add office_symbol to this payload to simplify things
import { useState, useMemo } from 'react';
import { useConnect } from 'redux-bundler-hook';

import debounce from 'lodash/debounce';

export default function NewChartModal() {
  const {
    doModalClose,
    doChartSave,
    doSearchFire,
    doSearchQueryUpdate,
    chartTypeItems,
    locationSearchItems,
    providerByRoute: provider,
  } = useConnect(
    'doModalClose',
    'doChartSave',
    'doSearchFire',
    'doSearchQueryUpdate',
    'selectChartTypeItems',
    'selectLocationSearchItems',
    'selectProviderByRoute'
  );

  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);

  // debounced search fire function
  const debouncedSearchFire = useMemo(
    () => debounce(doSearchFire, 300),
    [doSearchFire]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      provider: provider?.provider,
      location: location ? { location: location } : null,
      name: name || null,
      type: type || null,
    };
    doChartSave(payload);
    doModalClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <header>New Chart</header>
        {/* Provider */}
        {/* todo; Limit providers shown here to providers in user's token */}
        <label for='provider'>Provider</label>
        <input type='text' value={provider?.provider_name} disabled />

        {/* CHART NAME FIELD */}
        <label for='name'>
          Chart Name
          <input
            type='text'
            id='name'
            name='Name'
            placeholder='Name'
            autoComplete='off'
            onChange={(e) => {
              if (!e.target.value.trim()) {
                setName(null);
                return;
              }
              setName(e.target.value.trim());
            }}
            required
          />
        </label>
        {/* CHART TYPE FIELD */}
        <label for='charttype'>Chart Type</label>
        <select
          id='charttype'
          onChange={(e) => {
            if (!e.target.value.trim()) {
              setType(null);
              return;
            }
            setType(e.target.value);
          }}
          required
        >
          <option value='' selected>
            Select a chart...
          </option>
          {chartTypeItems?.length
            ? chartTypeItems.map((t, idx) => (
                <option key={idx} value={t.slug}>
                  {t.name}
                </option>
              ))
            : null}
        </select>
        {/* LOCATION FIELD; TODO; Improve this select to be a dropdown w/ typeahead*/}
        <label for='location'>Location</label>
        <input
          type='text'
          id='location'
          list='locationlist'
          name='Location'
          placeholder='Location (optional)'
          autoComplete='off'
          onChange={(e) => {
            doSearchQueryUpdate(e.target.value);
            debouncedSearchFire();
            if (!e.target.value.trim()) {
              setLocation(null);
              return;
            }
            setLocation(e.target.value.trim());
          }}
        />
        <datalist id='locationlist'>
          {locationSearchItems.map((s, idx) => (
            <option value={s.slug}>{s.name}</option>
          ))}
        </datalist>

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
              className='secondary m-0'
            >
              Cancel
            </button>

            <button type='submit' className='m-0'>
              Submit
            </button>
          </div>
        </footer>
      </article>
    </form>
  );
}
