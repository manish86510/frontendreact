import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: indigo[900]
      },
      primary: {
        main: indigo[700]
      }
    },
    typography: {
      fontFamily: [
        '"Lato"',
        'sans-serif'
      ].join(',')
    }
  });


  export default theme;