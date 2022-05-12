import React from 'react';
import {Field} from 'formik';
import PropTypes from 'prop-types';
import {INPUT_TYPES} from 'constants/common';

import Input from 'components/Common/Form/Input/Input';
import Textarea from 'components/Common/Form/Textarea/Textarea';
import Select from 'components/Common/Form/Select/Select';
// import Checkbox from 'components/Common/Form/Checkbox/Checkbox';
// import RadioButton from 'components/Common/Form/Radio/Radio';
// import Datepicker from 'components/Common/Datepicker/Datepicker';

const fieldTypes = {
  // checkbox: INPUT_TYPES.CHECKBOX,
  // radio: INPUT_TYPES.RADIO,
  select: INPUT_TYPES.SELECT,
  textarea: INPUT_TYPES.TEXTAREA,
  text: INPUT_TYPES.TEXT,
  number: INPUT_TYPES.NUMBER,
  email: INPUT_TYPES.EMAIL,
  date: INPUT_TYPES.DATE,
  password: INPUT_TYPES.PASSWORD
};

const FormikField = ({type, onChange, ...props}) => {
  const renderFormField = () => {
    switch (type) {
      // case fieldTypes.checkbox:
      //   return Checkbox;
      // case fieldTypes.radio:
      //   return RadioButton;
      case fieldTypes.select:
        return Select;
      case fieldTypes.textarea:
        return Textarea;
      // case fieldTypes.date:
      //   return Datepicker;
      default:
        return Input;
    }
  };

  /* eslint-disable react/prop-types */
  const getSelectValue = selected => {
    if (props.isMulti && selected) {
      return props.options.filter(option => selected.indexOf(option.value) >= 0);
    }
    if (selected) {
      return props.options.find(i => i.value === selected);
    }
    return '';
  };
  /* eslint-enable react/prop-types */

  return (
    <Field {...props}>
      {({field, meta}) => {
        const Component = renderFormField();
        const error = meta.touched && meta.error ? meta.error : undefined;

        const selectHandler = selected => {
          if (props.isMulti) {
            const values = selected.map(item => item.value);
            field.onChange({target: {name: field.name, value: values}});
            if (onChange) {
              onChange(values);
            }
          } else {
            field.onChange({
              target: {name: field.name, value: selected.value}
            });
            if (onChange) {
              onChange(selected.value);
            }
          }
        };

        const getOnChangeHandler = () =>
          type === fieldTypes.select ? selectHandler : field.onChange;

        const handleChange = getOnChangeHandler();

        return (
          <div id="form-field" data-testid="form-field" className="form-field">
            <Component
              type={type}
              {...props}
              {...field}
              value={type === fieldTypes.select ? getSelectValue(field.value) : field.value}
              onChange={handleChange}
              error={error}
            />
            {error && <div className="form-field__error">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
};

FormikField.propTypes = {
  type: PropTypes.oneOf(Object.values(fieldTypes)),
  isMulti: PropTypes.bool,
  onChange: PropTypes.func
};

export default FormikField;
