import { UserResponse } from "../../containers/UserList/UserList.types";

export interface UserTableData {
  usersList: UserResponse[];
  handleClickRow: (row: UserResponse) => void;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
}

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
}

export type UserTableProps = UserTableData;
