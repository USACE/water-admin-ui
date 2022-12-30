import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';

const LocationItem = ({
  attributes,
  code,
  datatype,
  datatype_name,
  provider,
  provider_name,
  slug,
  state,
  state_name,
}) => {
  return (
    <div key={slug}>
      <div className='primary'>{code}</div>
      <div className='secondary'>Datatype: {datatype_name}</div>
      <div className='secondary'>Provider: {provider_name}</div>
      <div className='secondary'>
        State: {state_name} ({state})
      </div>
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
    () => debounce(() => doSearchFire('location'), 300),
    [doSearchFire]
  );

  return (
    <Combobox
      value={value}
      onChange={(v) => {
        setValue(v);
        setIsValid(true); // TODO; Automatically setIsValid true when location is selected. May want to add more explicit validation checking
      }}
    >
      <Combobox.Label>{title}</Combobox.Label>
      <Combobox.Input
        // aria-invalid={!isValid}
        displayValue={(l) => l && `${l?.code} (${l?.provider?.toUpperCase()})`}
        placeholder={isRequired ? title : `${title} (optional)`}
        autoComplete='off'
        onChange={(event) => {
          // only show search results if more than 3 characters are typed in input
          if (event.target.value?.length < 3) {
            doSearchClear();
            // reset the selected location to 'null' if the entire field is deleted
            if (event.target.value?.length === 0) {
              setValue(null);
            }
            return;
          }
          doSearchQueryUpdate(event.target.value);
          debouncedSearchFire();
        }}
      />
      <Combobox.Options>
        {locationSearchItems.map((l) => (
          <Combobox.Option autoComplete='off' key={l.slug} value={l}>
            {({ active, selected }) => (
              <div
                className={`combobox-option${active ? ' active' : ''}${
                  selected ? ' selected' : ''
                }`}
              >
                <LocationItem {...l} />
              </div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default LocationCombobox;
