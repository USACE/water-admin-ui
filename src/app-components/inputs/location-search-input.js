import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';

const LocationItem = ({ locKey, name, public_name, kind, provider_name }) => {
  return (
    <div key={locKey}>
      <div className="primary">{name}</div>
      <div className="secondary">Public Name: {public_name}</div>
      <div className="secondary">Provider: {provider_name}</div>
      <div className="secondary">Kind: {kind}</div>
    </div>
  );
};

function LocationCombobox({
  title,
  value,
  setValue,
  isValid,
  setIsValid,
  isRequired,
  providerFilter,
}) {
  const {
    doSearchClear,
    doSearchFire,
    doSearchQueryUpdate,
    locationSearchItems,
  } = useConnect(
    'doSearchClear',
    'doSearchFire',
    'doSearchQueryUpdate',
    'selectLocationSearchItems'
  );

  // debounced search fire function
  const debouncedSearchFire = useMemo(
    () => debounce(doSearchFire, 150),
    [doSearchFire]
  );

  // limit the location results if a providerFilter is not null
  const locationResults = providerFilter
    ? locationSearchItems.filter((l) => l.provider_slug === providerFilter)
    : locationSearchItems;

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
        // aria-invalid={!isValid}
        displayValue={(l) => l?.name}
        placeholder={isRequired ? title : `${title} (optional)`}
        autoComplete="off"
        onChange={(event) => {
          if (event.target.value?.length < 3) {
            doSearchClear();
          }
          doSearchQueryUpdate(event.target.value);
          debouncedSearchFire();
        }}
      />
      <Combobox.Options>
        {locationResults.map((l) => (
          <Combobox.Option autoComplete="off" key={`${l.slug}`} value={l}>
            {({ active, selected }) => (
              <li
                className={`combobox-option${active ? ' active' : ''}${
                  selected ? ' selected' : ''
                }`}
              >
                {/* To avoid conflict between React.js keyword 'key' and timeseries entity property 'key',
                    the prop name tsKey is used to pass the .key property of timeseries */}
                <LocationItem locKey={l.slug} {...l} />
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default LocationCombobox;
