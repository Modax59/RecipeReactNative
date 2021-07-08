import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";
import appTheme from "../../constants/theme";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      buttonContainerStyle={{
        paddingVertical: 18,
        borderRadius: appTheme.SIZES.radius,
      }}
      color={[appTheme.COLORS.darkGreen, appTheme.COLORS.lime]}
      title={title}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
