import { makeStyles } from "@material-ui/core/styles";

export const useSideBarStyle = makeStyles((theme) => ({
  sideBar: {
    width: "255px",
    backgroundColor: theme.palette.basicColors.tuna,
    position: "fixed",
    height: "100%",
  },
  logo: {
    padding: "33px 62px",
  },
  sideMenuTabsWrapper: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));
