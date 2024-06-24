import { Button, styled } from "@mui/material";

const SButton = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));

export const SubmitButton = (props) => {
  const {disabled, handleEvent} = props;

  return (
    <SButton
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      color="inherit"
      disabled={disabled}
      onClick={handleEvent}
    >
      Submit
    </SButton>
  );
}