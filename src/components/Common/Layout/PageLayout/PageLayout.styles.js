import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';

const PageContent = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
});

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: '0',
  width: '100%',
  maxWidth: '1048px',
  margin: '0 auto'
});

const MainContent = styled('div')({
  borderRadius: '4px',
  flex: '1 0 auto',
  padding: '16px 0',
  '&.fullPage': {
    background: '#fff',
    padding: '16px'
  }
});

export {PageContainer, PageContent, MainContent};
