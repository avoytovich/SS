import {createTheme} from '@mui/material/styles';

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
  ERROR
} from './colors';

const themeConfig = createTheme({
  palette: {
    primary: {
      light: VIBRANT_BLUE,
      main: CAPGEMINI_BLUE,
      dark: DEEP_PURPLE,
      black: DARK_GREY,
      contrastText: WHITE,
      separator: GREY_2
    },
    secondary: {
      main: VIBRANT_BLUE
    },
    error: {
      main: ERROR
    },
    background: {
      default: GREY_1
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        textTransform: 'uppercase'
      },
      h4: {
        fontSize: '32px'
      }
    }
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    fontWeight: 400,
    fontSize: 14
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          '&.MuiAppBar-root': {
            margin: '0 auto',
            backgroundColor: GREY_1,
            boxShadow: 'none',
            width: '100%',
            '& .MuiLink-root': {
              borderRadius: '4px',
              color: DARK_GREY,
              fontSize: '18px',
              marginRight: '40px',
              textDecoration: 'none',
              padding: '8px',
              '&:hover:not(.active)': {
                opacity: 0.8
              },
              '&.active': {
                backgroundColor: GREY_3,
                fontWeight: 'bold'
              }
            }
          }
        }
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '.MuiTypography-root': {
            color: BLACK,
            display: 'flex',
            alignItems: 'center',
            margin: '24px 0'
          },
          '.MuiBreadcrumbs-li a': {
            cursor: 'pointer',
            '&:hover svg': {
              color: GREY_4
            }
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: GREY_0,
          border: `1px solid ${WHITE}`,
          '&:before,&:hover:not(.Mui-disabled):before,&:after': {
            borderBottom: 'none'
          },
          '&.Mui-focused': {
            border: `1px solid ${VIBRANT_BLUE}`
          },
          '&:not(.Mui-focused) .MuiInput-input::placeholder': {
            color: GREY_4
          },
          '& .MuiInput-input': {
            color: BLACK,
            padding: '7.5px 14px',
            '&::placeholder': {
              opacity: 1,
              color: GREY_4
            }
          },
          'label+&': {
            marginTop: '22px'
          }
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            border: `1px solid ${VIBRANT_BLUE}`
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: GREY_4,
          fontWeight: 400,
          '&.Mui-active': {
            color: GREY_4,
            fontWeight: 500
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderBottom: 'none'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: 0
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'flex-start'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          fontSize: 12,
          color: BLACK,
          '&:hover': {
            opacity: 0.8
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          backgroundColor: WHITE
        }
      }
    }
  }
});

export default themeConfig;
