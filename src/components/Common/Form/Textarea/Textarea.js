import React from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';

import Label from 'components/Common/Form/Label/Label';

const Textarea = ({label, className, size, error, showOptional, infoIcon, ...props}) => {
  const wrapperClassName = classnames('form-textarea', className, {
    'form-textarea__error': error
  });
  return (
    <div className={wrapperClassName}>
      <div className="form-textarea__wrapper">
        <Label
          label={label}
          htmlFor={props.name}
          showOptional={showOptional}
          required={props.required}
          infoIcon={infoIcon}
        />
        <textarea className={classnames('form-textarea__field', `field--${size}`)} {...props} />
      </div>
    </div>
  );
};

Textarea.defaultProps = {
  size: 'medium',
  rows: 6,
  onChange: () => {}
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  infoIcon: PropTypes.element,
  size: PropTypes.string,
  error: PropTypes.any,
  required: PropTypes.bool,
  showOptional: PropTypes.bool
};

export default Textarea;
