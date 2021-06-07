import { useState } from "react";
import { Hidden } from "@material-ui/core";
import { Images } from "../../images";
import { useSideBarStyle } from "./SideBar.style";
import { ReactComponent as OverViewIcon } from "../../images/icn-overview.svg";
import { ReactComponent as TicketIcon } from "../../images/icn-ticket.svg";
import { ReactComponent as IdeasIcon } from "../../images/icn-ideas.svg";
import { ReactComponent as UsersIcon } from "../../images/icn-users.svg";
import SideBarAction from "./SideBarAction/SideBarAction";
import {
  SIDE_BAR_OVERVIEW_ACITON,
  SIDE_BAR_IDEAS_ACTION,
  SIDE_BAR_TICKET_ACITON,
  SIDE_BAR_USERS_ACTION,
} from "../../constants/sidebar-constants";

const SideBar = () => {
  const classes = useSideBarStyle();
  const { logo, sideBar, sideMenuTabsWrapper } = classes;
  const [selectedAction, setSelectedAction] = useState("Users");

  const sideBarActions = [
    { title: SIDE_BAR_OVERVIEW_ACITON, icon: <OverViewIcon />, disabled: true },
    { title: SIDE_BAR_TICKET_ACITON, icon: <TicketIcon />, disabled: true },
    { title: SIDE_BAR_IDEAS_ACTION, icon: <IdeasIcon />, disabled: true },
    { title: SIDE_BAR_USERS_ACTION, icon: <UsersIcon />, disabled: false },
  ];

  const handleActionOnClick = (title: string) => {
    setSelectedAction(title);
  };

  return (
    <Hidden xsDown>
      <div className={sideBar}>
        <div className={logo}>
          <img src={Images.logo} alt="Userpilot logo" />
        </div>
        <div className={sideMenuTabsWrapper}>
          {sideBarActions &&
            sideBarActions.length > 0 &&
            sideBarActions.map((action, index) => (
              <SideBarAction
                key={`${action.title}-${index}`}
                title={action.title}
                Icon={action.icon}
                disabled={action.disabled}
                handleActionClick={handleActionOnClick}
                isSelected={action.title === selectedAction}
              />
            ))}
        </div>
      </div>
    </Hidden>
  );
};

export default SideBar;
