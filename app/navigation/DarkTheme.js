import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";
import appTheme from "../constants/theme";

export default {
  ...DefaultTheme,
  colors: {
    ...appTheme.COLORS,
    primary: appTheme.COLORS.white,
    secondary: appTheme.COLORS.secondary,
    background: appTheme.COLORS.backgroundDark,
    secondBackground: appTheme.COLORS.secondBackgroundDark,
    loaderBackground: appTheme.COLORS.transparentGray,
  },
};
