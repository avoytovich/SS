import {red} from '@mui/material/colors';
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
  BLACK
} from './colors';

const {breakpoints} = createTheme();

const themeConfig = createTheme({
  palette: {
    primary: {
      light: VIBRANT_BLUE,
      main: CAPGEMINI_BLUE,
      dark: DEEP_PURPLE,
      contrastText: WHITE,
      separator: GREY_2
    },
    secondary: {
      main: VIBRANT_BLUE
    },
    error: {
      main: red.A400
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
            [breakpoints.up('sm')]: {
              width: '100%'
            },
            [breakpoints.up('md')]: {
              width: '1200px'
            },
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
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: GREY_4,
    //       zIndex: 2,
    //       '&[data-shrink="true"]': {
    //         padding: 0
    //       },
    //       '&[data-shrink="false"]': {
    //         transform: 'translate(0, 23px) scale(1)'
    //       },
    //       '&.fixed': {
    //         transform: 'translate(0, -1.5px) scale(0.75);',
    //         padding: 0
    //       }
    //     }
    //   }
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: GREY_0,
    //       borderRadius: 0,
    //       '&:focus': {
    //         borderColor: VIBRANT_BLUE
    //       },
    //       '&:not(.Mui-focused) .MuiOutlinedInput-input::placeholder': {
    //         color: GREY_4
    //       },
    //       '& .MuiOutlinedInput-input': {
    //         color: BLACK,
    //         '&::placeholder': {
    //           opacity: 1,
    //           color: GREY_4
    //         }
    //       },
    //       '& .MuiMenuItem-root ': {
    //         borderBottom: 'none'
    //       },
    //       '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
    //         borderColor: WHITE
    //       },
    //       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //         borderWidth: '1px',
    //         borderColor: VIBRANT_BLUE
    //       }
    //     }
    //   }
    // },
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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${GREY_0}`,
          '&.Mui-selected': {
            backgroundColor: VIBRANT_BLUE,
            color: WHITE
          },
          '&.Mui-disabled': {
            color: GREY_4,
            opacity: 1
          }
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
    // MuiFormLabel: {
    //   styleOverrides: {
    //     root: {
    //       padding: '8.5px 14px',
    //     },
    //   },
    // },
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
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '40px',
          boxShadow: 'none',
          fontSize: '14px',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        outlined: {
          borderColor: DARK_GREY,
          color: DARK_GREY,
          '&:hover': {
            color: CAPGEMINI_BLUE
          }
        },
        contained: {
          '&:hover': {
            background: DARK_GREY
          }
        }
      }
    }
  }
});

export default themeConfig;
