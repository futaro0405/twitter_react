import { Outlet } from "react-router-dom";

// mui
import { Container, Grid, styled } from "@mui/material";

// containers
import { Header } from "./Header";
import { Footer } from "./Footer";

// styled
const SContainer = styled(Container)(({theme}) => ({
  marginTop: theme.spacing(4)
}));

export const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <SContainer maxWidth="lg">
          <Grid container justify="center">
            <Grid item>
              <Outlet />
            </Grid>
          </Grid>
        </SContainer>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
