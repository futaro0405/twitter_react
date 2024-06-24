import { Button, styled } from "@mui/material";

const SButton = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));

export const PrimaryButton = (props) => {
  const {type, disabled, handleEvent} = props;

  return (
    <SButton
      type={type}
      disabled={disabled}
      onClick={handleEvent}
      variant="contained"
      size="large"
      fullWidth
      color="inherit"
    >
      Submit
    </SButton>
  );
}