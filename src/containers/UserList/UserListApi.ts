import axios from "axios";
import { APP_USERS_API } from "../../constants/app-constants";
import { addOrUpdateQueryParameter } from "../../utils";
import { ApiOPtions } from "./UserList.types";

export const UserListAPI = {
  getUsersList: (options: ApiOPtions) => {
    const pagnationParams = {
      results: options.results,
      page: options.page,
    };
    let apiPath = `${APP_USERS_API}/api?results=${pagnationParams.results}&&page=${pagnationParams.page}`;

    const filtersParams = { nat: options.nat, gender: options.gender };

    const natSearchParam = filtersParams.nat;
    const genderSearchPram = filtersParams.gender;

    if (natSearchParam) {
      apiPath = addOrUpdateQueryParameter(apiPath, "nat", filtersParams.nat);
    }

    if (genderSearchPram) {
      apiPath = addOrUpdateQueryParameter(
        apiPath,
        "gender",
        filtersParams.gender
      );
    }

    return axios
      .get(apiPath)
      .then((res) => {
        if (
          !res ||
          !res.data ||
          !res.data.results ||
          res.data.results.length === 0
        ) {
          return;
        }
        return res.data.results;
      })
      .catch((error) => {});
  },
  getUserDetails: (userId: string) => {
    return axios
      .get(`${APP_USERS_API}/api`)
      .then((res) => {
        if (!res || !res.data || !res.data.results) {
          return;
        }
        return res.data.results;
      })
      .catch((error) => {});
  },
};
