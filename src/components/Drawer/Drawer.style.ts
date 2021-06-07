import { makeStyles } from "@material-ui/core/styles";

export const useDrawerStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "545px",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
  blueDiv: {
    height: "158px",
    backgroundColor: theme.palette.basicColors.dodgerBlue,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    borderRadius: "50%",
    width: "130px",
    height: "130px",
    position: "absolute",
    top: "90px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  userInfoWrapper: {
    marginTop: "88px",
    textAlign: "center",
  },
  userName: {
    fontFamily: "MulishBold",
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "20px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: theme.palette.basicColors.charade,
  },
  userLocation: {
    fontFamily: "MulishRegular",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "center",
    letterSpacing: "0.1px",
    color: theme.palette.basicColors.osloGray,
    marginTop: "10px",
  },
}));
