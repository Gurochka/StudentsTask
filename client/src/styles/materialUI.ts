import { createMuiTheme } from '@material-ui/core/styles';
import { yellow, blue, grey } from '@material-ui/core/colors';

const materialUiTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: blue[400],
        },
        secondary: {
            main: yellow[800]
        },
        background: {
            default: grey[700]
        }
    },
    typography: {
        fontFamily: "'Open Sans', sans-serif;",
        fontSize: 14
    }
});

export { materialUiTheme };
