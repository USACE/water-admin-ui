import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';

const TimeseriesItem = ({
  datasource_type,
  provider,
  tsKey,
  latest_time,
  latest_value,
}) => {
  return (
    <div>
      <div>Key: {tsKey}</div>
      <div>Provider: {provider}</div>
      <div>Datasource: {datasource_type}</div>
      <div>Latest Time: {latest_time}</div>
      <div>Latest Value: {latest_value}</div>
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
    () => debounce(doSearchFire, 150),
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
        displayValue={(t) => t?.key}
        onChange={(event) => {
          if (event.target.value?.length < 3) {
            doSearchClear();
          }
          doSearchQueryUpdate(event.target.value);
          debouncedSearchFire();
        }}
      />
      <Combobox.Options>
        {timeseriesSearchItems.map((t) => (
          <Combobox.Option key={`${t.provider}-${t.key}`} value={t}>
            {({ active, selected }) => (
              <li
                className={`timeseries-combobox-option${
                  active ? ' active' : ''
                }${selected ? ' selected' : ''}`}
              >
                {/* To avoid conflict between React.js keyword 'key' and timeseries entity property 'key',
                    the prop name tsKey is used to pass the .key property of timeseries */}
                <TimeseriesItem tsKey={t.key} {...t} />
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default TimeseriesCombobox;
