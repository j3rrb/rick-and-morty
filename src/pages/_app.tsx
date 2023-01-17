import client from "@/services/api";
import { ApolloProvider } from "@apollo/client";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppProps } from "next/app";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
        <AppBar>
          <Toolbar>
            <Typography flexGrow={1}>Rick and Morty APP</Typography>
          </Toolbar>
        </AppBar>
        <Box mt={8} component="div">
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Box>
      </Container>
    </Provider>
  );
}
