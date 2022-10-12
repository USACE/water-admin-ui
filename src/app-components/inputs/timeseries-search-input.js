import { useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useConnect } from 'redux-bundler-hook';

// todo; this form needs additional validation, refinement, componentization

function TimeseriesSearchInput({
  id,
  title,
  value,
  setValue,
  isValid,
  setIsValid,
}) {
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
    () => debounce(doSearchFire, 300),
    [doSearchFire]
  );

  function handleChange(e) {
    doSearchQueryUpdate(e.target.value);
    debouncedSearchFire();
    if (!e.target.value.trim().length) {
      setValue(null);
      return;
    }
    setValue(e.target.value);
  }

  function handleBlur(e) {
    // trim leading and trailing spaces
    setValue(e.target.value.trim());

    // validate timeseries
    // todo; implement more robust timeseries validation here
    //       to get things working, set anything that is not an empty string to
    //       valid. empty strings are invalid
    console.log(`TODO; Validate timeseries ${e.target.value}`);
    if (setIsValid && typeof setIsValid === 'function') {
      if (!e.target.value.trim().length) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }

    // clear search results
    doSearchClear();
  }

  return (
    <>
      {/* POOL INPUT */}
      <label for={id}>
        {title}
        <input
          aria-invalid={isValid === null ? null : !isValid} // todo; implement true/false/null for validation status
          required={true}
          type='text'
          id={id}
          list={`${id} list`}
          name={id}
          value={value}
          placeholder='start typing ...'
          autoComplete='off'
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => {
            // invalidate field
            setIsValid(null);
            // do not fire search on empty string
            if (e.target.value) {
              doSearchQueryUpdate(e.target.value);
              doSearchFire();
              return;
            }
          }}
        />
      </label>
      <datalist id={`${id} list`}>
        {timeseriesSearchItems.map((s, idx) => (
          <option key={idx} value={s.key} />
        ))}
      </datalist>
    </>
  );
}

export default TimeseriesSearchInput;
