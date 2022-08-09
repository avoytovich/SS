import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {FormControl, Select, MenuItem} from '@mui/material';

import {getRenderValue, Option} from 'components/Common/DataGrid/Filters/Select/utils';
import {selectStyles, useStyles} from 'components/Common/DataGrid/Filters/Select/styles';
import {IconButton} from 'components/Button';
import {CloseIcon} from 'components/Icons';

const StyledCloseIconButton = styled(IconButton)(() => ({
  marginRight: '6px'
}));

const GridSelect = ({id, name, value, multiple, label, minWidth, options, onChange, onClear}) => {
  const classes = useStyles();
  const isShowClearItem = multiple ? value?.length > 0 : value;

  const handleChange = event => onChange(event.target.value, name);

  const handleCLear = () => onClear(multiple ? [] : '', name);

  const getSelectValue = () => getRenderValue(value, options, multiple, label);

  const renderCloseIcon = () => (
    <StyledCloseIconButton
      id="remove-icon"
      data-testid={`${id}-select-remove-icon`}
      size="small"
      onClick={handleCLear}
    >
      <CloseIcon />
    </StyledCloseIconButton>
  );

  return (
    <FormControl sx={{minWidth}} data-testid={`${id}-control`}>
      <Select
        id={id}
        data-testid={`${id}-select`}
        multiple={multiple}
        value={value}
        displayEmpty
        sx={selectStyles}
        renderValue={getSelectValue}
        onChange={handleChange}
        endAdornment={isShowClearItem ? renderCloseIcon() : null}
        MenuProps={{
          classes: {paper: isShowClearItem ? classes.marginMenuPaper : classes.menuPaper}
        }}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            <Option option={option} value={value} multiple={multiple} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

GridSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  id: PropTypes.string,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onClear: PropTypes.func
};

GridSelect.defaultProps = {
  id: 'grid-select',
  name: 'select',
  multiple: false,
  label: 'Label',
  size: 'small',
  minWidth: '233px',
  options: [],
  onChange: () => {},
  onClear: () => {}
};

export default React.memo(GridSelect);
