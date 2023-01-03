import { useEffect, useMemo, useState } from 'react';
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

function TimeseriesCombobox({ title, value, onSelect }) {
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

  // TODO; More strict validation checking. Currently, if a string value is set, it is considered valid.
  //       In the future, may want to consider checking if string value represents a valid timeseries
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (value) {
      setIsValid(true);
    }
  }, [value]);

  // debounced search fire function
  const debouncedSearchFire = useMemo(
    () => debounce(() => doSearchFire('timeseries'), 300),
    [doSearchFire]
  );

  return (
    <Combobox
      value={value}
      onChange={(v) => {
        onSelect(v);
      }}
    >
      <Combobox.Label>
        <div className='container gx-0'>
          <div className='row'>
            <div className={`col-12 ${!value ? '' : 'col-md-4'}`}>{title}</div>
            {!value ? null : (
              <div
                className={`col-12 col-md-8 text-md-end ${
                  value?.latest_value ? 'text-success' : 'text-warning'
                }`}
              >
                <small>
                  Latest :{' '}
                  {value?.latest_value ? (
                    <span>
                      <strong>{value.latest_value[1]}</strong>
                      {` at ${value.latest_value[0]}`}
                    </span>
                  ) : (
                    'Not Available'
                  )}
                </small>
              </div>
            )}
          </div>
        </div>
      </Combobox.Label>
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
              onSelect(null);
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
            key={`${t.provider}-${t.datatype}-${t.key}`}
            value={t}
          >
            {({ active, selected }) => (
              <div
                className={`combobox-option${active ? ' active' : ''}${
                  selected ? ' selected' : ''
                }`}
              >
                {/* To avoid conflict between React.js keyword 'key' and timeseries entity property 'key',
                    the prop name timeseriesKey is used to pass the .key property of timeseries */}
                <TimeseriesItem timeseriesKey={t.key} {...t} />
              </div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default TimeseriesCombobox;
