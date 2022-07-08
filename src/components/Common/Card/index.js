import * as React from 'react';
import PropTypes from 'prop-types';

import CardContent from './CardContent/CardContent.styles';
import CardStyled from './Card.styles';
import CardHeader from './CardHeader/CardHeader.styles';

const Card = ({title, children, ...props}) => (
  <CardStyled {...props}>
    {title && <CardHeader title={title} disableTypography />}
    <CardContent>{children}</CardContent>
  </CardStyled>
);

Card.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};

Card.defaultProps = {
  title: ''
};

export default Card;
