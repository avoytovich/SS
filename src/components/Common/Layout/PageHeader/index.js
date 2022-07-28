import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

import {Heading} from 'components/Typography';

import useStyles from './styles';

const PageHeader = ({title, subTitle, children, extra, rest}) => {
  const classes = useStyles();
  return (
    <div id="page-header" data-testid="page-header-main" className="page-header" {...rest}>
      <Box className={classes.titleWrap}>
        <div className="page-header--title-wrap" data-testid="page-header-title">
          <Heading data-testid="page-header-title-text" className="page-header--title-wrap--text">
            {title}
          </Heading>
          {subTitle && <div className="page-header--description">{subTitle}</div>}
        </div>
        {extra && (
          <div className="page-header--title-wrap--extra">
            <span>{extra}</span>
          </div>
        )}
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
  children: PropTypes.node
};

export default PageHeader;
