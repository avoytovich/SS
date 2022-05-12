import React, {useState} from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';

import Label from 'components/Common/Form/Label/Label';

const Input = ({
  label,
  name,
  icon,
  className,
  type,
  renderIcon,
  labelIsPlaceholder,
  labelHelper,
  showOptional,
  infoIcon,
  ...props
}) => {
  const [showValue, changeShowStatus] = useState(false);

  const wrapperClassNames = classnames('form-input', className, {
    'form-input--labeled': labelIsPlaceholder
  });

  const inputClassNames = classnames('form-input__input', {
    'form-input__input--icon': icon
  });

  const isPasswordInput = type === 'password';
  const passwordInputType = showValue ? 'text' : 'password';

  const toggleValueVisibility = () => {
    changeShowStatus(!showValue);
  };

  return (
    <div className={wrapperClassNames}>
      <Label
        label={label}
        labelHelper={labelHelper}
        htmlFor={name}
        showOptional={showOptional}
        infoIcon={infoIcon}
        required={props.required}
        hasValue={!!props.value && props.value.length}
      />

      <div className="form-input__wrapper">
        <input
          className={inputClassNames}
          name={name}
          id={name}
          data-testid={name}
          type={isPasswordInput ? passwordInputType : type}
          {...props}
        />

        {isPasswordInput && (
          <button
            id="-input-toggle-value-button"
            data-testid="-input-toggle-value-button"
            tabIndex={-1}
            type="button"
            onClick={toggleValueVisibility}
            className="form-input__password-toggle"
          >
            {showValue ? 'hide' : 'show'}
          </button>
        )}
        {renderIcon && renderIcon()}
      </div>
    </div>
  );
};

Input.defaultProps = {
  onChange: () => {},
  icon: null,
  renderIcon: null,
  maxLength: 15
};

Input.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  renderIcon: PropTypes.func,
  infoIcon: PropTypes.element,
  onChange: PropTypes.func,
  className: PropTypes.string,
  labelIsPlaceholder: PropTypes.bool,
  labelHelper: PropTypes.string,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  showOptional: PropTypes.bool
};

export default Input;
