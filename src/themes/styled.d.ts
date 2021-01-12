// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
    };
  }
}