import { createTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors'

const theme = createTheme({
    palette: {
      secondary: {
        main: indigo[900]
      },
      primary: {
        main: z
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