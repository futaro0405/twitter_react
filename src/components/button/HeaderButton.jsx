import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

// style
const SButton = styled(Button)(() => ({
  textTransform: "none"
}));

export const HeaderButton = (props) => {
  const {children, to, click} = props;
  return (
    <>
      <SButton
        component={Link}
        color="inherit"
        to={to}
        onClick={click}
      >
        {children}
      </SButton>
    </>
  );
}
