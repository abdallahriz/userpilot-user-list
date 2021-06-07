import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Form, Formik } from "formik";
import { Typography, Hidden } from "@material-ui/core";
import { Images } from "../../images";
import { useUserListStyle } from "./UserList.style";
import FormikTextField from "../../components/formik/FormikTextField";
import FormikSelect from "../../components/formik/FormikSelect";
import UsersTable from "../../components/UsersTable";
import { UserListAPI } from "./UserListApi";
import DrawerComponent from "../../components/Drawer";
import AutoSave from "../../components/AutoSubmit";
import { ApiOPtions, UserResponse } from "./UserList.types";
import {
  USER_LIST_PAGE_HEADER,
  USER_LIST_TABLE_HEADER,
  USER_LIST_USER_NAME,
} from "../../constants/user-list.constants";

const UserList = () => {
  const classes = useUserListStyle();
  const {
    avatar,
    avatarWrapper,
    container,
    form,
    formControlStyle,
    selectButtonStyles,
    header,
    natInputFieldStyle,
    paper,
    searchWrapper,
    tableHeader,
    tableTitle,
    title,
    userName,
    userWrapper,
    paperStyle,
  } = classes;
  const { userId } = useParams<{ userId: string }>();
  const [usersList, setUsersList] = useState<UserResponse[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<UserResponse | undefined>(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const nationalityFieldRef = useRef("");
  const genderFieldRef = useRef("");

  const initialValues = { gender: "", nationality: "" };

  //   const options = [{label: "Male"}]
  const getUserListApi = async (options: ApiOPtions) => {
    const userList = await UserListAPI.getUsersList(options);
    setUsersList(userList);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    const options = {
      results: rowsPerPage,
      page: newPage,
      nat: nationalityFieldRef.current,
      gender: genderFieldRef.current,
    };
    getUserListApi(options);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const options = {
      results: +event.target.value,
      page: page,
      nat: nationalityFieldRef.current,
      gender: genderFieldRef.current,
    };
    getUserListApi(options);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (values: { nationality: string; gender: string }) => {
    const options = {
      results: rowsPerPage,
      page: page,
      nat: values.nationality,
      gender: values.gender,
    };
    getUserListApi(options);
    nationalityFieldRef.current = values.nationality;
    genderFieldRef.current = values.gender;
  };

  const handleClickUserRow = (user: UserResponse) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleOnClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    const getUserDetails = async (userId: string) => {
      const result = await UserListAPI.getUserDetails(userId);
      setSelectedUser(result[0]);
      setIsDrawerOpen(true);
    };
    getUserDetails(userId);
  }, [userId]);

  const options = [
    { label: "None", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  return (
    <div className={container}>
      <div className={header}>
        <Typography className={title}>{USER_LIST_PAGE_HEADER}</Typography>
        <div className={userWrapper}>
          <Typography className={userName}>{USER_LIST_USER_NAME}</Typography>
          <div className={avatarWrapper}>
            <img src={Images.avatar} className={avatar} alt="avatar" />
          </div>
        </div>
      </div>
      <div className={paper}>
        <div className={tableHeader}>
          <Typography className={tableTitle}>
            {USER_LIST_TABLE_HEADER}
          </Typography>
          <Hidden xsDown>
            <div className={searchWrapper}>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                }): React.ReactNode => {
                  return (
                    <Form className={form}>
                      <AutoSave debounceMs={300} />
                      <FormikSelect
                        buttonStyles={selectButtonStyles}
                        label={"Gender"}
                        paperStyles={paperStyle}
                        name={"gender"}
                        options={options}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        error={errors["gender"]}
                      />
                      <FormikTextField
                        FormControlStyle={formControlStyle}
                        name={"nationality"}
                        value={values.nationality}
                        autoComplete={"nationality"}
                        margin={"normal"}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        className={natInputFieldStyle}
                        placeholder={"Nationality"}
                        error={errors["nationality"]}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </Hidden>
        </div>
        <div>
          <UsersTable
            usersList={usersList}
            handleClickRow={handleClickUserRow}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </div>
      <DrawerComponent
        isDrawerOpen={isDrawerOpen}
        anchor={"right"}
        data={selectedUser}
        handleOnClose={handleOnClose}
      />
    </div>
  );
};

export default UserList;
