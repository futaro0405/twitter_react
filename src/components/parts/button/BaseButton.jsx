import { Button, styled } from "@mui/material";

export const BaseButton = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));
