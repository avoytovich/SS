const diffFormValues = (initialValues, newValues) => {
  const res = {};
  const initialValuesKeys = Object.keys(initialValues);

  // eslint-disable-next-line no-restricted-syntax
  for (const key in newValues) {
    if (initialValuesKeys.includes(key) && initialValues[key] !== newValues[key]) {
      // Add object checking if it need
      // if () {
      //   res[key] = diffFormValues(initialValues[key], newValues[key]);
      // } else {
      //   res[key] = newValues[key];
      // }
      res[key] = newValues[key];
    }
  }

  return res;
};

const formErrorsHandling = () => {};

export {diffFormValues, formErrorsHandling};
