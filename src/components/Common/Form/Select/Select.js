import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import Label from 'components/Common/Form/Label/Label';

const Select = ({size, label, error, disabled, shape, ...props}) => (
  <div
    className={classnames('form-select', {
      [`select--${size}`]: size,
      [`select--${shape}`]: shape,
      'form-select--error': error
    })}
  >
    <Label label={label} required={props.required} infoIcon={props.infoIcon} />
    <ReactSelect {...props} isDisabled={disabled} classNamePrefix="select" />
  </div>
);

Select.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  infoIcon: PropTypes.element,
  size: PropTypes.string,
  shape: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

export default Select;
