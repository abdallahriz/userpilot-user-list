export interface DrawerData {
  anchor: "left" | "top" | "right" | "bottom";
  isDrawerOpen: boolean;
  handleOnClose: () => void;
  data: any;
}
export type DrawerProps = DrawerData;
