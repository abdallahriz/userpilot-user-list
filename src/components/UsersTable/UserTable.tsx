import Paper from "@material-ui/core/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useUserTableStyle } from "./UsersTable.style";
import { getDate, getTime } from "../../utils";
import { UserTableProps, Column } from "./UserTable.types";
import { UserResponse } from "../../containers/UserList/UserList.types";
import {
  USER_TABLE_USERS_COLUMN_LABEL,
  USER_TABLE_CONTACT_INFO_COLUMN_LABEL,
  USER_TABLE_REGISTRATION_COLUMN_LABEL,
  USER_TABLE_PASTCODE_COLUMN_LABEL,
} from "../../constants/user-list.constants";

const columns: Column[] = [
  {
    id: USER_TABLE_USERS_COLUMN_LABEL,
    label: USER_TABLE_USERS_COLUMN_LABEL,
    minWidth: 440,
  },
  {
    id: USER_TABLE_CONTACT_INFO_COLUMN_LABEL,
    label: USER_TABLE_CONTACT_INFO_COLUMN_LABEL,
    minWidth: 208,
  },
  {
    id: USER_TABLE_REGISTRATION_COLUMN_LABEL,
    label: USER_TABLE_REGISTRATION_COLUMN_LABEL,
    minWidth: 140,
  },
  {
    id: USER_TABLE_PASTCODE_COLUMN_LABEL,
    label: USER_TABLE_PASTCODE_COLUMN_LABEL,
    minWidth: 131,
  },
];

const UsersTable = (props: UserTableProps) => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleClickRow,
    page,
    rowsPerPage,
    usersList,
  } = props;
  const classes = useUserTableStyle();
  const {
    userName,
    flex,
    header,
    actions,
    avatarThumbnail,
    caption,
    input,
    root,
    select,
    subHeader,
    tableBodyCell,
    tableHeadCell,
    tableRow,
    userInfoWrapper,
    userLocation,
    toolbar,
  } = classes;

  const tablePaginationClasses = {
    input: input,
    actions: actions,
    select: select,
    caption: caption,
    toolbar: toolbar,
  };

  const TableDataCell = (cellInfo: {
    header: string;
    subHeader: string | number;
  }) => {
    return (
      <TableCell className={tableBodyCell}>
        <Typography className={header}>{cellInfo.header}</Typography>
        <Typography className={subHeader}>{cellInfo.subHeader}</Typography>
      </TableCell>
    );
  };

  return (
    <Paper className={root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={tableHeadCell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList.length > 0 &&
              usersList.map((row: UserResponse) => {
                return (
                  <TableRow
                    key={row.login.uuid}
                    className={tableRow}
                    role="checkbox"
                    tabIndex={-1}
                    onClick={() => handleClickRow(row)}
                  >
                    <TableCell className={tableBodyCell}>
                      <div className={flex}>
                        <img
                          className={avatarThumbnail}
                          src={row.picture.thumbnail}
                          alt="User Thumbnail"
                        />
                        <div className={userInfoWrapper}>
                          <Typography className={userName}>
                            {row.name.first} {row.name.last}
                          </Typography>
                          <Typography className={userLocation}>
                            {row.location.street.number}{" "}
                            {row.location.street.name}. {row.location.city}{" "}
                            {row.location.state}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableDataCell header={row.email} subHeader={row.phone} />
                    <TableDataCell
                      header={getDate(row.registered.date)}
                      subHeader={getTime(row.registered.date)}
                    />
                    <TableDataCell
                      header={row.location.country}
                      subHeader={row.location.postcode}
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        classes={tablePaginationClasses}
        rowsPerPageOptions={[8, 40, 96]}
        component="div"
        count={96}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={() => <></>}
      />
    </Paper>
  );
};

export default UsersTable;
