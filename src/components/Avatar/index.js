import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import AvatarMui from '@mui/material/Avatar';

const AvatarStyled = styled(AvatarMui)({
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  marginRight: '10px'
});

const Avatar = ({src, name, ...props}) => <AvatarStyled alt={name} src={src} {...props} />;

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string
};

export default Avatar;
