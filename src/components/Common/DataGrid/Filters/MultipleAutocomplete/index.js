import React, {useCallback, useState} from 'react';

import {Autocomplete} from '@mui/material';

import AutocompleteInput from 'components/Common/DataGrid/Filters/MultipleAutocomplete/AutocompleteInput';
import AutocompleteOption from 'components/Common/DataGrid/Filters/MultipleAutocomplete/AutocompleteOption';

const MultipleAutocomplete = ({
  id,
  values,
  options,
  label,
  minWidth,
  onSelect,
  onChange,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const onOpenAutocompleteBox = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onCloseAutocompleteBox = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onRemoveAutocompleteValues = useCallback(() => {
    onSelect([]);
  }, [onSelect]);

  const onSelectOption = useCallback(
    option => {
      onSelect([...new Set([...values, option])]);
    },
    [onSelect]
  );

  const onRemoveOption = useCallback(
    option => {
      onSelect(values.filter(value => value.id !== option.id));
    },
    [onSelect]
  );

  const onInputChange = useCallback(
    value => {
      if (value) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <Autocomplete
      multiple
      id={id}
      data-testid={'multiple-autocomplete'}
      open={open}
      onOpen={onOpenAutocompleteBox}
      onClose={onCloseAutocompleteBox}
      value={values}
      options={options}
      disabled={!options.length}
      disableCloseOnSelect
      getOptionLabel={option => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      clearOnEscape
      {...rest}
      renderOption={(props, option) => (
        <AutocompleteOption
          key={option.id}
          values={values}
          option={option}
          onSelect={onSelectOption}
          onRemove={onRemoveOption}
          {...props}
        />
      )}
      renderInput={params => (
        <AutocompleteInput
          id={id}
          options={options}
          onChange={onInputChange}
          values={values}
          label={label}
          minWidth={minWidth}
          disabled={!options.length}
          onRemoveValues={onRemoveAutocompleteValues}
          toggleAutocompleteMenu={setOpen}
          {...params}
        />
      )}
    />
  );
};

export default React.memo(MultipleAutocomplete);
