import { Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { useDrawerStyle } from "./Drawer.style";
import { DrawerProps } from "./Drawer.types";

export const DrawerComponent = (props: DrawerProps) => {
  const classes = useDrawerStyle();
  const { anchor, data, handleOnClose, isDrawerOpen } = props;
  const {
    avatar,
    userLocation,
    userInfoWrapper,
    userName,
    drawerPaper,
    blueDiv,
  } = classes;
  const BackdropProps = { invisible: true };
  const drawerClasses = { paper: drawerPaper };

  return (
    <Drawer
      BackdropProps={BackdropProps}
      anchor={anchor}
      open={isDrawerOpen}
      onClose={handleOnClose}
      classes={drawerClasses}
    >
      <div className={blueDiv}>
        <img
          src={data && data.picture && data.picture.large}
          className={avatar}
          alt="avatar"
        />
      </div>
      <div className={userInfoWrapper}>
        {data && data.name && (
          <Typography className={userName}>
            {data.name.first} {data.name.last}
          </Typography>
        )}
        {data && data.location && (
          <Typography className={userLocation}>
            {data.location.street.number} {data.location.street.name}.{" "}
            {data.location.city} {data.location.state}
          </Typography>
        )}
      </div>
    </Drawer>
  );
};
