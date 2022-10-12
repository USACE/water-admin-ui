import { useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useConnect } from 'redux-bundler-hook';

// todo; this form needs additional validation, refinement, componentization

function TimeseriesSearchInput({ id, title, value, setValue }) {
  const { doSearchFire, doSearchQueryUpdate, timeseriesSearchItems } =
    useConnect(
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
    if (!e.target.value.trim()) {
      setValue(null);
      return;
    }
    setValue(e.target.value.trim());
  }

  return (
    <>
      {/* POOL INPUT */}
      <label for={id}>
        {title}
        <input
          required={true}
          type='text'
          id={id}
          list={`${id} list`}
          name={id}
          value={value}
          placeholder='start typing ...'
          autoComplete='off'
          onChange={handleChange}
        />
      </label>
      <datalist id={`${id} list`}>
        {timeseriesSearchItems.map((s, idx) => (
          <option key={idx} value={s.key}>
            {s.key}
          </option>
        ))}
      </datalist>
    </>
  );
}

export default TimeseriesSearchInput;
