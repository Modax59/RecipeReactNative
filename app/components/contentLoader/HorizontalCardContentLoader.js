import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTheme } from "@react-navigation/native";

function HorizontalCardContentLoader() {
  const { colors } = useTheme();
  return (
    <>
      {[1, 2, 3, 4].map((value) => (
        <ContentLoader
          viewBox="0 0 462 160"
          height={160}
          width={462}
          backgroundColor={colors.loaderBackground}
          foregroundColor={colors.secondBackground}
        >
          <Rect x="150" y="16" rx="5" ry="5" width="200" height="15" />
          <Rect x="150" y="90" rx="5" ry="5" width="119" height="12" />
          <Rect x="26" y="10" rx="0" ry="0" width="100" height="100" />
          <Rect x="13" y="54" rx="0" ry="0" width="0" height="0" />
          <Rect x="13" y="50" rx="0" ry="0" width="0" height="0" />
        </ContentLoader>
      ))}
    </>
  );
}

export default HorizontalCardContentLoader;
