import * as React from 'react';

import {useStyles} from './styles';

const PageContent = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.content} data-testid="page-content-wrapper">
      {children}
    </div>
  );
};

export default PageContent;
