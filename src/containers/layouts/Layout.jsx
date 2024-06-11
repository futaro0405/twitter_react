import { Container, Grid } from "@mui/material"

import Header from "./Header"

// 全てのページで共通となるレイアウト
const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container justify="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Layout
