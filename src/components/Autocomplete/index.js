import PropTypes from 'prop-types';

import SingleAutocomplete from './components/Autocomplete';
import MultipleAutocomplete from './components/MultipleAutocomplete';

const Autocomplete = ({multiple, ...props}) =>
  multiple ? <MultipleAutocomplete {...props} /> : <SingleAutocomplete {...props} />;

Autocomplete.propTypes = {
  multiple: PropTypes.bool,
  ...SingleAutocomplete.propTypes,
  ...MultipleAutocomplete.propTypes
};

Autocomplete.defaultProps = {
  multiple: false
};

export default Autocomplete;
