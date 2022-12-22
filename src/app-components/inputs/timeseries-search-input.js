import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';

const TimeseriesItem = ({
  datatype_name,
  provider,
  provider_name,
  timeseriesKey,
  latest_value,
}) => {
  return (
    <div key={`${provider}-${timeseriesKey}`}>
      <div className='primary'>{timeseriesKey}</div>
      <div className='secondary'>Datatype: {datatype_name}</div>
      <div className='secondary'>Provider: {provider_name}</div>
      <div className='secondary'>
        Latest Value:{' '}
        {latest_value?.length
          ? `${latest_value[1]} at ${latest_value[0]}`
          : '---'}
      </div>
    </div>
  );
};

function TimeseriesCombobox({ title, value, setValue, isValid, setIsValid }) {
  const {
    doSearchClear,
    doSearchFire,
    doSearchQueryUpdate,
    timeseriesSearchItems,
  } = useConnect(
    'doSearchClear',
    'doSearchFire',
    'doSearchQueryUpdate',
    'selectTimeseriesSearchItems'
  );

  // debounced search fire function
  const debouncedSearchFire = useMemo(
    () => debounce(() => doSearchFire('timeseries'), 150),
    [doSearchFire]
  );

  return (
    <Combobox
      value={value}
      onChange={(v) => {
        setValue(v);
        setIsValid(true); // TODO; Automatically setIsValid true when timeseries is selected. May want to add more explicit validation checking
      }}
    >
      <Combobox.Label>{title}</Combobox.Label>
      <Combobox.Input
        aria-invalid={!isValid}
        displayValue={(t) => t && `${t?.key} (${t?.provider?.toUpperCase()})`}
        placeholder='Search Timeseries...'
        onChange={(event) => {
          // only show search results if more than 3 characters are typed in input
          if (event.target.value?.length < 3) {
            doSearchClear();
            // reset the selected location to 'null' if the entire field is deleted
            if (event.target.value?.length === 0) {
              setValue(null);
              setIsValid(false);
            }
            return;
          }
          doSearchQueryUpdate(event.target.value);
          debouncedSearchFire();
        }}
      />
      <Combobox.Options>
        {timeseriesSearchItems.map((t) => (
          <Combobox.Option
            autoComplete='off'
            key={`${t.provider}-${t.key}`}
            value={t}
          >
            {({ active, selected }) => (
              <li
                className={`combobox-option${active ? ' active' : ''}${
                  selected ? ' selected' : ''
                }`}
              >
                {/* To avoid conflict between React.js keyword 'key' and timeseries entity property 'key',
                    the prop name timeseriesKey is used to pass the .key property of timeseries */}
                <TimeseriesItem timeseriesKey={t.key} {...t} />
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default TimeseriesCombobox;
