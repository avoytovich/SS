import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';

const Label = ({
  label,
  labelHelper,
  required,
  showOptional,
  htmlFor,
  infoIcon,
  hasValue,
  labelIsPlaceholder
}) =>
  label ? (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={classnames('form-label', {
        'form-label--placeholder': labelIsPlaceholder,
        'form-label--placeholder-filled': hasValue,
        'form-label--with-optional': !required && showOptional
      })}
      htmlFor={htmlFor}
    >
      <span>{label}</span>
      {labelHelper && <span className="helper">{labelHelper}</span>}
      {infoIcon}
      {!required && showOptional && <span className="optional">Optional</span>}
    </label>
  ) : null;

Label.defaultProps = {
  showOptional: true,
  label: ''
};

Label.propTypes = {
  label: PropTypes.string,
  labelHelper: PropTypes.string,
  required: PropTypes.bool,
  showOptional: PropTypes.bool,
  htmlFor: PropTypes.string,
  infoIcon: PropTypes.element,
  labelIsPlaceholder: PropTypes.bool,
  hasValue: PropTypes.bool
};

export default Label;
