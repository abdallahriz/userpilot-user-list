import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import RouterComponent from "./router";
import theme from "./theme";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SideBar />
      <RouterComponent />
    </ThemeProvider>
  );
};

export default App;
