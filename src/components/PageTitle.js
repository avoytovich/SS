import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet-async';

export default function PageTitle({title = '', includeAppName = true}) {
  const fullTitle = `${title} ${includeAppName ? '- Smart Skills' : ''}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  includeAppName: PropTypes.bool
};
