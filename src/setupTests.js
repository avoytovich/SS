// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// eslint-disable-next-line no-undef
jest.mock('lodash', () => ({
  get: (data, path, defaultValue) => {
    if (data && data.path) {
      return data[path];
    }
    return defaultValue;
  }
}));
