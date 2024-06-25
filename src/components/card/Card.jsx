import {
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  Card as MuiCard,
  styled
} from "@mui/material";

const SHeader = styled(MuiCardHeader)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textAlign: "center",
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
      <MuiCardContent>
        {children}
      </MuiCardContent>
    </SCard>
  );
}