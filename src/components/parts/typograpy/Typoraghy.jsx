import { Typography as MuiTypography } from "@mui/material";

export const Typography = (props) => {
  const {children} = props;
  return (
    <MuiTypography variant="body2">{children}</MuiTypography>
  );
}