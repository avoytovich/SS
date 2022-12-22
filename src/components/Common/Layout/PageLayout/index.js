import * as React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import HelmetWrapper from 'containers/HelmetWrapper';

import Header from '../Header';
import Footer from '../../Footer';
import PageHeader from '../PageHeader';
import {PageLoader} from '../../../Loader';

import {PageContainer, PageContent, MainContent} from './PageLayout.styles';

const PageLayout = ({
  title,
  pageTitle,
  extra,
  type,
  hiddenHeader,
  includeAppName,
  subTitle,
  children,
  isLoading,
  isBack,
  onBack
}) => {
  const {isAuthenticated} = useSelector(state => state.auth);
  return (
    <PageContainer data-testid="main-content-wrapper">
      <HelmetWrapper title={pageTitle || title} includeAppName={includeAppName} />
      {isAuthenticated && !hiddenHeader && <Header />}
      {isLoading ? (
        <PageContent>
          <PageLoader />
        </PageContent>
      ) : (
        <PageContent>
          {title && (
            <PageHeader
              title={title}
              extra={extra}
              subTitle={subTitle}
              isBack={isBack}
              onBack={onBack}
            />
          )}
          <MainContent className={type}>{children}</MainContent>
        </PageContent>
      )}
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
  hiddenHeader: PropTypes.bool,
  isLoading: PropTypes.bool,
  isBack: PropTypes.bool,
  onBack: PropTypes.func
};

PageLayout.defaultProps = {
  title: '',
  pageTitle: '',
  subTitle: '',
  type: 'fullPage', // cardsLayout,
  hiddenHeader: false,
  isBack: false
};

export default PageLayout;
