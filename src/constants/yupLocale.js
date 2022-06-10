export default {
  /* INFO: Disabled rule because it's a YUP schema template  */
  /* eslint-disable no-template-curly-in-string */
  string: {
    length: 'The field must be exactly ${length} characters',
    min: 'The field must be at least ${min} characters',
    max: 'The field must be at most ${max} characters',
    matches: 'The field must match the following: "${regex}"',
    email: 'The field must be a valid email',
    url: 'The field must be a valid URL',
    trim: 'The field must be a trimmed string',
    lowercase: 'The field must be a lowercase string',
    uppercase: 'The field must be a upper case string'
  },
  number: {
    min: 'The field must be greater than or equal to ${min}',
    max: 'The field must be less than or equal to ${max}',
    lessThan: 'The field must be less than ${less}',
    moreThan: 'The field must be greater than ${more}',
    notEqual: 'The field must be not equal to ${notEqual}',
    positive: 'The field must be a positive number',
    negative: 'The field must be a negative number',
    integer: 'The field must be an integer'
  },
  date: {
    min: 'The field must be later than ${min}',
    max: 'The field must be at earlier than ${max}'
  },
  array: {
    min: 'The field must have at least ${min} items',
    max: 'The field must have less than or equal to ${max} items'
  },
  object: {
    noUnknown: 'The field cannot have keys not specified in the object shape'
  },
  mixed: {
    default: 'The field is invalid',
    required: 'This field is a required field',
    oneOf: 'The field must be one of the following values: ${values}',
    notOneOf: 'The field must not be one of the following values: ${values}'
  }
  /* eslint-enable no-template-curly-in-string */
};
