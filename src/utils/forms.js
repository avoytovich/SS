import isEqual from 'lodash/isEqual';

import errorCodes from 'constants/errorCodes';

const diffFormValues = (initialValues, newValues) => {
  const res = {};
  const initialValuesKeys = Object.keys(initialValues);

  // eslint-disable-next-line no-restricted-syntax
  for (const key in newValues) {
    if (
      Array.isArray(initialValues[key]) &&
      Array.isArray(newValues[key]) &&
      !isEqual(initialValues[key], newValues[key])
    ) {
      res[key] = newValues[key];
    } else if (initialValuesKeys.includes(key) && initialValues[key] !== newValues[key]) {
      res[key] = newValues[key];

      // Add object checking if it need
      // if (is Obj) {
      //   res[key] = diffFormValues(initialValues[key], newValues[key]);
      // }
    }
  }

  return res;
};

const formErrorsHandling = (errors, actions) => {
  const formErrors = {};
  const {fields} = errors.data;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in fields) {
    formErrors[key] = errorCodes[fields[key]];
  }
  actions.setErrors(formErrors);
};

const formSubmitHandling = (submitFn, values, actions, onSuccess, onError) => {
  submitFn(values)
    .unwrap()
    .then(() => {
      if (onSuccess) onSuccess();

      actions.resetForm();
    })
    .catch(error => {
      formErrorsHandling(error, actions);
      if (onError) onError();
    })
    .finally(() => {
      actions.setSubmitting(false);
    });
};

export {diffFormValues, formSubmitHandling, formErrorsHandling};
