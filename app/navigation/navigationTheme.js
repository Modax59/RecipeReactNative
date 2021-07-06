import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";
import appTheme from "../constants/theme";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    background: colors.purWhite,
    secondBackground: appTheme.COLORS.lightGray,
    loaderBackground: appTheme.COLORS.gray4,
  },
};
