import * as React from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';

import Header from '../Header';
import Footer from '../../Footer';

import {PageContainer, PageContent, MainContent} from './PageLayout.styles';
import PageHeader from '../PageHeader';

const PageLayout = ({title, extra, type, hiddenHeader, subTitle, children}) => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <PageContainer data-testid="main-content-wrapper">
      {isAuthenticated && !hiddenHeader && <Header />}
      <PageContent>
        <PageHeader title={title} extra={extra} subTitle={subTitle} />
        <MainContent className={type}>{children}</MainContent>
      </PageContent>
      <Footer />
    </PageContainer>
  );
};

PageLayout.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  extra: PropTypes.node,
  children: PropTypes.node,
  hiddenHeader: PropTypes.bool
};

PageLayout.defaultProps = {
  title: '',
  subTitle: '',
  type: 'default', // fullPage,
  hiddenHeader: false
};

export default PageLayout;
