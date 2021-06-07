import { UserResponse } from "../../containers/UserList/UserList.types";

export interface DrawerData {
  anchor: "left" | "top" | "right" | "bottom";
  isDrawerOpen: boolean;
  handleOnClose: () => void;
  data: UserResponse | undefined;
}
export type DrawerProps = DrawerData;
