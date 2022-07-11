import * as React from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';

import HelmetWrapper from 'containers/HelmetWrapper';
import Header from '../Header';
import Footer from '../../Footer';
import PageHeader from '../PageHeader';

import {PageContainer, PageContent, MainContent} from './PageLayout.styles';

const PageLayout = ({
  title,
  pageTitle,
  extra,
  type,
  hiddenHeader,
  includeAppName,
  subTitle,
  children
}) => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <PageContainer data-testid="main-content-wrapper">
      <HelmetWrapper title={pageTitle || title} includeAppName={includeAppName} />
      {isAuthenticated && !hiddenHeader && <Header />}
      <PageContent>
        {title && <PageHeader title={title} extra={extra} subTitle={subTitle} />}
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
  pageTitle: '',
  subTitle: '',
  type: 'fullPage', // cardsLayout,
  hiddenHeader: false
};

export default PageLayout;
