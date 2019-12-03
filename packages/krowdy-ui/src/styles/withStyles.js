import { withStyles as withStylesWithoutDefault } from '@material-ui/styles';
import createMuiTheme from './createMuiTheme';
import krowdyTheme from './krowdyTheme';

const defaultTheme = createMuiTheme(krowdyTheme);

function withStyles(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default withStyles;
