import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet-async';

const HelmetWrapper = ({title, includeAppName}) => {
  const fullTitle = `${title} ${includeAppName ? '- Smart Skills' : ''}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

HelmetWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  includeAppName: PropTypes.bool
};

HelmetWrapper.defaultProps = {
  includeAppName: true,
  title: ''
};

export default HelmetWrapper;
