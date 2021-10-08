import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import createBreakpoints from '@mui/system/esm/createTheme/createBreakpoints';
import {
  CAPGEMINI_BLUE,
  VIBRANT_BLUE,
  DEEP_PURPLE,
  DARK_GREY,
  WHITE,
  GREY_0,
  GREY_1,
  GREY_2,
  GREY_3,
  GREY_4,
  BLACK,
} from './common/colors';

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    primary: {
      light: VIBRANT_BLUE,
      main: CAPGEMINI_BLUE,
      dark: DEEP_PURPLE,
      contrastText: WHITE,
      separator: GREY_2,
    },
    secondary: {
      main: VIBRANT_BLUE,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: GREY_1,
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        textTransform: 'uppercase',
      },
      h4: {
        fontSize: '32px',
      },
    },
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          '&.MuiAppBar-root': {
            margin: '0 auto',
            backgroundColor: GREY_1,
            boxShadow: 'none',
            [breakpoints.up('sm')]: {
              width: '100%',
            },
            [breakpoints.up('md')]: {
              width: '1200px',
            },
            '& .MuiLink-root': {
              borderRadius: '4px',
              color: DARK_GREY,
              fontSize: '18px',
              marginRight: '40px',
              textDecoration: 'none',
              padding: '8px',
              '&:hover:not(.active)': {
                opacity: 0.8,
              },
              '&.active': {
                backgroundColor: GREY_3,
                fontWeight: 'bold',
              },
            },
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '.MuiTypography-root': {
            color: BLACK,
            display: 'flex',
            alignItems: 'center',
          },
          '.MuiBreadcrumbs-li a': {
            cursor: 'pointer',
            '&:hover svg': {
              color: GREY_4,
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: GREY_0,
          border: `1px solid ${WHITE}`,
          '&:before,&:hover:not(.Mui-disabled):before,&:after': {
            borderBottom: 'none',
          },
          '&.Mui-focused': {
            border: `1px solid ${VIBRANT_BLUE}`,
          },
          '& .MuiInput-input': {
            color: GREY_4,
            paddingLeft: '8.5px',
            '&::placeholder': {
              color: GREY_4,
            },
          },
          'label+&': {
            marginTop: '22px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: GREY_4,
          zIndex: 2,
          padding: '8.5px 14px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: GREY_0,
          borderRadius: 0,
          '& .MuiMenuItem-root ': {
            borderBottom: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: WHITE,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${GREY_0}`,
          '&.Mui-selected': {
            backgroundColor: VIBRANT_BLUE,
            color: WHITE,
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: GREY_4,
          fontWeight: 400,
          '&.Mui-active': {
            color: GREY_4,
            fontWeight: 500,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
      },
    },
  },
});

export default theme;
