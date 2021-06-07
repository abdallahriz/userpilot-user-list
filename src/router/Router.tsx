import { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Loader from "../components/common/Loader";
import { ROUTES } from "./routes";
import history from "./history";

const RouterComponent = () => {
  const UserList = lazy(() => import("../containers/UserList"));
  const NotFound = lazy(() => import("../containers/NotFound"));

  return (
    <Router history={history}>
      <Suspense fallback={<Loader open={true} />}>
        <Switch>
          <Route path={ROUTES.root} exact component={UserList} />
          <Route path={ROUTES.USER_LIST} component={UserList} />
          <Route path={ROUTES.USER_DETAILS} component={UserList} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
