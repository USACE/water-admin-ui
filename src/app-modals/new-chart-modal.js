// POST Payload
// {
//     "location_slug": "lrh-test-project",
//     "name": "LRHTestProject Dam Profile Chart",
//     "type_id": "53da77d0-6550-4f02-abf8-4bcd1a596a7c"
// }
// TODO; Change type_id to 'type' (slug of chart) in api
// TODO; May need to add office_symbol to this payload to simplify things
import { useState } from 'react';
import { useConnect } from 'redux-bundler-hook';

import LocationCombobox from '../app-components/inputs/location-search-input';

export default function NewChartModal() {
  const {
    doModalClose,
    doChartSave,
    chartTypeItems,
    providerByRoute: provider,
  } = useConnect(
    'doModalClose',
    'doChartSave',
    'selectChartTypeItems',
    'selectProviderByRoute'
  );

  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  // TODO; More strict validation checking. Currently, if a string value is set, it is considered valid.
  //       In the future, may want to consider checking if string value represents a valid timeseries
  const [locationIsValid, setLocationIsValid] = useState(
    location ? true : false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      provider: provider?.provider,
      location: location || null,
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
        <label htmlFor='provider'>Provider</label>
        <input type='text' value={provider?.provider_name} disabled />

        {/* CHART NAME FIELD */}
        <label htmlFor='name'>
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
        <label htmlFor='charttype'>Chart Type</label>
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
        {/* LOCATION FIELD */}
        <LocationCombobox
          title='Location'
          value={location}
          setValue={setLocation}
          isValid={!location || locationIsValid}
          setIsValid={setLocationIsValid}
          isRequired={false}
        />
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
