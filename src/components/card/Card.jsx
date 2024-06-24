import { CardContent, CardHeader, Card as MuiCard, styled } from "@mui/material";

const SHeader = styled(CardHeader)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));
const SCard = styled(MuiCard)(({theme}) => ({
  padding: theme.spacing(2),
  maxWidth: 400
}));


export const Card = (props) => {
  const { title, children } = props;

  return (
    <SCard>
      <SHeader title={title} />
      <CardContent>
        {children}
      </CardContent>
    </SCard>
  );
}