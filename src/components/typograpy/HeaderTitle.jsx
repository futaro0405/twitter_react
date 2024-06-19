import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const STitle = styled(Typography)(() => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: "#fff"
  }
}));

export const HeaderTitle = (props) => {
  const {children, to} = props;
  return (
    <STitle
      component={Link}
      to={to}
      variant="h6"
    >
      {children}
    </STitle>
  );
};