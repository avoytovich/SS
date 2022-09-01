import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {Box} from '@mui/material';

import {Heading} from 'components/Typography';
import {IconButton} from 'components/Button';
import {ArrowBackIcon} from 'components/Icons';

import useStyles from './styles';

const PageHeader = ({title, subTitle, children, extra, isBack, onBack, rest}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      history.goBack();
    }
  };

  return (
    <div id="page-header" data-testid="page-header-main" className="page-header" {...rest}>
      <Box className={classes.titleWrap}>
        <div className="page-header--title-wrap" data-testid="page-header-title">
          <Heading data-testid="page-header-title-text" className="page-header--title-wrap--text">
            {isBack && (
              <IconButton size="large" onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {title}
          </Heading>
          {subTitle && <div className="page-header--description">{subTitle}</div>}
        </div>
        {extra && <div className={classes.wrapExtra}>{extra}</div>}
      </Box>
      {children}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  // Elements (buttons, links), at the end of the line of the title line
  extra: PropTypes.node,
  children: PropTypes.node,
  isBack: PropTypes.bool,
  onBack: PropTypes.func
};

export default PageHeader;
